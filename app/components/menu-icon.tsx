import { Clock, Heart, Leaf, Package, Plus, Sparkles, Zap } from "lucide-react"
import type { MenuIcon as MenuIconName } from "@/lib/menu"

const ICONS = {
  sparkles: Sparkles,
  heart: Heart,
  leaf: Leaf,
  zap: Zap,
  clock: Clock,
  package: Package,
  plus: Plus,
} satisfies Record<MenuIconName, typeof Sparkles>

export default function MenuIcon({
  name,
  className = "h-5 w-5",
}: {
  name?: string
  className?: string
}) {
  const Icon = ICONS[(name as MenuIconName) ?? "sparkles"] ?? Sparkles
  return <Icon className={className} />
}
