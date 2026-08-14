import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import type { Photo } from '../content'

type LightboxProps = {
  /** The photo to show, or null when the lightbox is closed. */
  photo: Photo | null
  onClose: () => void
}

/**
 * Accessible image lightbox built on the native <dialog> element.
 *
 * Native <dialog> gives us focus trapping, Escape-to-close, and focus
 * restoration for free — no library needed. We open/close it imperatively
 * in response to the `photo` prop.
 */
export function Lightbox({ photo, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  // Open or close the modal to match the `photo` prop.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (photo && !dialog.open) {
      dialog.showModal()
    } else if (!photo && dialog.open) {
      dialog.close()
    }
  }, [photo])

  // Keep React state in sync when the dialog closes itself (Escape key, etc.).
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  // Clicking the backdrop (the dialog element itself, outside the figure) closes.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={photo ? `Photo: ${photo.alt}` : 'Photo viewer'}
      onClick={handleClick}
    >
      <button
        type="button"
        className="lightbox__close"
        aria-label="Close photo"
        data-cursor="hover"
        onClick={() => dialogRef.current?.close()}
      >
        <span aria-hidden="true">&times;</span>
      </button>

      {photo && (
        <figure className="lightbox__figure">
          <img
            className="lightbox__img"
            src={photo.src}
            alt={photo.alt}
            decoding="async"
          />
          <figcaption className="lightbox__caption">{photo.alt}</figcaption>
        </figure>
      )}
    </dialog>
  )
}
