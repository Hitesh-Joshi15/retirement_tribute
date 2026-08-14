// ============================================================
//  Guestbook data service
// ------------------------------------------------------------
//  A tiny provider layer so the UI never talks to storage directly.
//  Backed by Cloud Firestore — messages are shared across every visitor.
//
//  Security is enforced by Firestore rules: public read; create requires
//  the exact { name, text, createdAt } shape with size limits; update is
//  blocked; delete is allowed only when the request is signed in as the
//  admin account.
//
//  Deletes work by signing in with Firebase Authentication using the
//  admin email + the password the user types into the card, deleting
//  the doc, then signing out again. The password itself never lives
//  in the code or the env — Firebase Auth stores it (hashed).
// ============================================================

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from './firebase'
import { containsProfanity } from '../utils/profanity'

export type GuestMessage = {
  id: string
  name: string
  text: string
  createdAt: number
}

export type NewGuestMessage = {
  name: string
  text: string
}

export const NAME_MAX = 60
export const TEXT_MAX = 600

const COLLECTION = 'guestbook'

export const guestbook = {
  /** All messages, newest first. */
  async list(): Promise<GuestMessage[]> {
    const snap = await getDocs(
      query(collection(db, COLLECTION), orderBy('createdAt', 'desc')),
    )
    return snap.docs.map((doc) => {
      const data = doc.data() as {
        name?: string
        text?: string
        createdAt?: Timestamp
      }
      // `createdAt` can be null for a split second right after add() returns —
      // Firestore stamps it on the server. Fall back to "now" so the UI still
      // sorts sensibly in that tiny race window.
      const createdAt =
        data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now()
      return {
        id: doc.id,
        name: data.name ?? '',
        text: data.text ?? '',
        createdAt,
      }
    })
  },

  /** Add a message. Throws with a friendly message if invalid. */
  async add(input: NewGuestMessage): Promise<GuestMessage> {
    const name = input.name.trim().slice(0, NAME_MAX)
    const text = input.text.trim().slice(0, TEXT_MAX)
    if (!name || !text) {
      throw new Error('Please add your name and a message.')
    }
    // Defence in depth — the form checks this too, and Firestore rules enforce
    // shape and size limits. Keeping it here just gives a friendlier error.
    if (containsProfanity(name) || containsProfanity(text)) {
      throw new Error('Please keep the message friendly and family-appropriate.')
    }

    const ref = await addDoc(collection(db, COLLECTION), {
      name,
      text,
      createdAt: serverTimestamp(),
    })
    return {
      id: ref.id,
      name,
      text,
      createdAt: Date.now(),
    }
  },

  /**
   * Delete a message. Signs in as the admin with the password the visitor
   * typed, deletes the doc, then signs out so no admin session lingers on a
   * shared device. Firebase Auth verifies the password server-side and
   * rate-limits brute-force attempts automatically.
   */
  async remove(id: string, password: string): Promise<void> {
    const email = import.meta.env.VITE_ADMIN_EMAIL
    if (!email) {
      throw new Error(
        'Admin email missing. Restart the dev server after editing .env.local.',
      )
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Guestbook sign-in failed:', error)
      const code = (error as { code?: string })?.code
      if (code === 'auth/operation-not-allowed') {
        throw new Error(
          'Email/Password sign-in is disabled in Firebase Auth. Enable it in the console.',
        )
      }
      if (code === 'auth/network-request-failed') {
        throw new Error('Network error. Check your connection and try again.')
      }
      throw new Error('Incorrect password.')
    }
    try {
      await deleteDoc(doc(db, COLLECTION, id))
    } catch (error) {
      console.error('Guestbook delete failed:', error)
      throw new Error('Delete blocked by security rules. Check the Firestore rules.')
    } finally {
      await signOut(auth).catch(() => undefined)
    }
  },
}
