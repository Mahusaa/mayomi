/**
 * Rotating accent palette so repeated cards (branches, treatments, values)
 * each get their own colour instead of all being the same sage.
 * Class names are written out in full so Tailwind can see them.
 */
export interface Accent {
  /** Gradient for icon tiles and top bars */
  gradient: string
  /** Light tinted surface */
  soft: string
  /** Readable text on white / soft surfaces */
  text: string
  /** Hover ring around a card */
  ring: string
}

export const ACCENTS: Accent[] = [
  {
    gradient: "from-mayomi-500 to-teal",
    soft: "bg-mayomi-50",
    text: "text-mayomi-700",
    ring: "hover:ring-mayomi-300",
  },
  {
    gradient: "from-peach to-gold",
    soft: "bg-peach-soft/60",
    text: "text-peach-deep",
    ring: "hover:ring-peach/50",
  },
  {
    gradient: "from-teal to-mayomi-400",
    soft: "bg-teal-soft/70",
    text: "text-teal-deep",
    ring: "hover:ring-teal/40",
  },
  {
    gradient: "from-gold to-peach",
    soft: "bg-gold-soft/60",
    text: "text-gold-deep",
    ring: "hover:ring-gold/50",
  },
]

export const accentAt = (index: number) => ACCENTS[index % ACCENTS.length]
