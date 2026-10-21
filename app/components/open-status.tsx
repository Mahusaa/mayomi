"use client"

import { useEffect, useState } from "react"
import { CLOSE_HOUR, OPEN_HOUR } from "@/lib/branches"

const pad = (hour: number) => `${String(hour).padStart(2, "0")}.00`

/** Current hour in Jakarta, regardless of the visitor's own time zone. */
function jakartaHour() {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "numeric",
    hourCycle: "h23",
  }).format(new Date())
  return Number(hour)
}

export default function OpenStatus() {
  // Unknown until mounted: the server render can't know the visitor's "now".
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const update = () => {
      const hour = jakartaHour()
      setIsOpen(hour >= OPEN_HOUR && hour < CLOSE_HOUR)
    }
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  if (isOpen === null) return null

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isOpen ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${isOpen ? "bg-emerald-500" : "bg-gray-400"}`}
        aria-hidden="true"
      />
      {isOpen ? `Buka sekarang · tutup ${pad(CLOSE_HOUR)}` : `Tutup · buka ${pad(OPEN_HOUR)}`}
    </span>
  )
}
