// ============================================================
//  Profanity guard (dependency-free)
// ------------------------------------------------------------
//  First line of defence for the guestbook against abusive input.
//  It normalizes common evasions (leetspeak, repeated letters, symbols)
//  before matching a bl- ocklist on word boundaries so benign words like
//  "class" or "assassin" are not falsely flagged.
//
//  This is intentionally conservative and NOT a substitute for
//  server-side enforcement + human moderation. Mild words (e.g. "damn",
//  "hell") are deliberately excluded so heartfelt notes aren't blocked.
//  Extend BLOCKED_WORDS, or swap in a library like `obscenity`, as needed.
// ============================================================

const BLOCKED_WORDS = [
  'anus',
  'arsehole',
  'asshole',
  'bastard',
  'bitch',
  'bollocks',
  'bullshit',
  'clit',
  'cock',
  'cunt',
  'dick',
  'dildo',
  'dyke',
  'fag',
  'faggot',
  'fuck',
  'jizz',
  'motherfucker',
  'nigga',
  'nigger',
  'piss',
  'prick',
  'pussy',
  'retard',
  'shit',
  'slut',
  'spastic',
  'twat',
  'wank',
  'whore',
]

const LEET_MAP: Record<string, string> = {
  '@': 'a',
  '4': 'a',
  '8': 'b',
  '3': 'e',
  '1': 'i',
  '!': 'i',
  '0': 'o',
  '5': 's',
  $: 's',
  '7': 't',
}

/** Lowercase, de-leet, strip symbols, and collapse padded/repeated letters. */
function normalize(text: string): string {
  let out = ''
  for (const char of text.toLowerCase()) {
    out += LEET_MAP[char] ?? char
  }
  return out
    .replace(/[^a-z0-9\s]/g, ' ') // symbols -> space
    .replace(/(.)\1{2,}/g, '$1') // 3+ repeats -> single (fuuuck -> fuck)
    .replace(/\s+/g, ' ')
    .trim()
}

/** Returns true if the text contains a blocked word. */
export function containsProfanity(text: string): boolean {
  const normalized = normalize(text)
  if (!normalized) return false
  return BLOCKED_WORDS.some((word) =>
    new RegExp(`\\b${word}\\b`).test(normalized),
  )
}
