/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Firebase Web SDK config — safe to expose; access controlled by Firestore rules. */
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  /** Admin account email — matched by Firestore rules to authorise deletes. */
  readonly VITE_ADMIN_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
