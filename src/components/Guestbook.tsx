import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  guestbook,
  NAME_MAX,
  TEXT_MAX,
  type GuestMessage,
} from '../services/guestbook'
import { containsProfanity } from '../utils/profanity'

export function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const honeypotRef = useRef<HTMLInputElement | null>(null)

  const refresh = () => {
    guestbook
      .list()
      .then(setMessages)
      .catch(() => {})
  }

  useEffect(refresh, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    // Honeypot: humans leave it blank; simple bots fill every field.
    if (honeypotRef.current?.value) return

    if (!name.trim() || !text.trim()) {
      setError('Please add your name and a message.')
      return
    }
    if (containsProfanity(name) || containsProfanity(text)) {
      setError('Please keep the message friendly and family-appropriate.')
      return
    }

    setPending(true)
    try {
      await guestbook.add({ name, text })
      setName('')
      setText('')
      refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setPending(false)
    }
  }

  return (
    <section id="guestbook" className="guestbook">
      <motion.div
        className="guestbook__head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">Sign the guestbook</p>
        <h2>Add your own note for Zoukhra.</h2>
        <p className="guestbook__intro">
          A line, a memory, a thank-you — anything you&rsquo;d like her to read.
          Messages appear here for everyone to enjoy.
        </p>
      </motion.div>

      <div className="guestbook__layout">
        <form className="guestbook__form" onSubmit={onSubmit} noValidate>
          <label className="guestbook__field">
            <span>Your name</span>
            <input
              type="text"
              value={name}
              maxLength={NAME_MAX}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Alex from Delivery"
              data-cursor="hover"
              required
            />
          </label>

          <label className="guestbook__field">
            <span>Your message</span>
            <textarea
              value={text}
              maxLength={TEXT_MAX}
              rows={4}
              onChange={(event) => setText(event.target.value)}
              placeholder="Share a memory or a thank-you…"
              data-cursor="hover"
              required
            />
            <span className="guestbook__count">
              {text.length}/{TEXT_MAX}
            </span>
          </label>

          {/* Honeypot — hidden from people, tempting to bots. */}
          <input
            ref={honeypotRef}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="guestbook__honeypot"
            aria-hidden="true"
          />

          {error && (
            <p className="guestbook__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="guestbook__submit"
            data-cursor="hover"
            disabled={pending}
          >
            {pending ? 'Adding…' : 'Add my message'}
          </button>
        </form>

        <div className="guestbook__list" data-lenis-prevent>
          {messages.length === 0 ? (
            <p className="guestbook__empty">
              No messages yet — be the first to sign.
            </p>
          ) : (
            <ul>
              {messages.map((message) => (
                <GuestCard
                  key={message.id}
                  message={message}
                  onDeleted={refresh}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function GuestCard({
  message,
  onDeleted,
}: {
  message: GuestMessage
  onDeleted: () => void
}) {
  const [confirming, setConfirming] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const cancel = () => {
    setConfirming(false)
    setPassword('')
    setError('')
  }

  const remove = async () => {
    setError('')
    setBusy(true)
    try {
      await guestbook.remove(message.id, password)
      onDeleted()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete.')
    } finally {
      setBusy(false)
    }
  }

  const date = new Date(message.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <li className="guest-card">
      <div className="guest-card__body">
        <p className="guest-card__text">{message.text}</p>
        <footer className="guest-card__foot">
          <strong>{message.name}</strong>
          <span>{date}</span>
        </footer>

        {confirming && (
          <div className="guest-card__confirm">
            <label className="sr-only" htmlFor={`pw-${message.id}`}>
              Owner password
            </label>
            <input
              id={`pw-${message.id}`}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Owner password"
              data-cursor="hover"
              autoComplete="off"
            />
            <button
              type="button"
              className="guest-card__confirm-del"
              data-cursor="hover"
              onClick={remove}
              disabled={busy}
            >
              {busy ? 'Deleting…' : 'Delete'}
            </button>
            <button
              type="button"
              className="guest-card__confirm-cancel"
              data-cursor="hover"
              onClick={cancel}
            >
              Cancel
            </button>
            {error && (
              <span className="guest-card__error" role="alert">
                {error}
              </span>
            )}
          </div>
        )}
      </div>

      {!confirming && (
        <button
          type="button"
          className="guest-card__delete"
          data-cursor="hover"
          aria-label={`Delete message from ${message.name}`}
          onClick={() => setConfirming(true)}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path
              d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-1 13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </li>
  )
}
