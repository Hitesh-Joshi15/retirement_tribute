import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Fragment, type MouseEvent } from 'react'
import { messages } from '../content'
import type { Message } from '../content'

// Renders **word** as <strong>word</strong>; leaves the rest as plain text.
function renderMessage(text: string) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

export function Messages() {
  return (
    <section id="messages" className="messages">
      <motion.div
        className="messages__head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">From the team</p>
        <h2>Thirty years of thank-yous, in the team&rsquo;s own words.</h2>
      </motion.div>

      <div className="messages__grid">
        {messages.map((message, index) => (
          <MessageCard key={message.name} message={message} index={index} />
        ))}
      </div>
    </section>
  )
}

function MessageCard({
  message,
  index,
}: {
  message: Message
  index: number
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-120, 120], [10, -10])
  const rotateY = useTransform(x, [-120, 120], [-12, 12])

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="message-wrap"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.section
        className="message"
        data-cursor="hover"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
      >
        <div className="message__inner">
          <span className="message__mark">“</span>
          <p data-lenis-prevent>{renderMessage(message.text)}</p>
          <footer>
            <strong>{message.name}</strong>
            <span>{message.role}</span>
          </footer>
        </div>
      </motion.section>
    </motion.div>
  )
}
