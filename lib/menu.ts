// Price list source: "Price List Mayomi Massage" sheet, tab "NEW PL Massage".
// Prices are the pre-tax treatment price (Regular Room) in IDR.

export const TAX_RATE = 0.1
export const TAX_NOTE = "Harga belum termasuk pajak 10%"

export type MenuIcon = "sparkles" | "heart" | "leaf" | "zap" | "clock" | "package" | "plus"

export interface MenuOption {
  /** Minutes. */
  duration: number
  price: number
  popular?: boolean
}

export interface Treatment {
  id: string
  name: string
  /** Category label from the price list ("Jenis Treatment"). */
  category: string
  description: string
  icon: MenuIcon
  options: MenuOption[]
}

export interface MenuPackage {
  id: string
  code: string
  name: string
  includes: string[]
  duration: number
  price: number
  popular?: boolean
}

export interface MenuAddon {
  id: string
  name: string
  description: string
  icon: MenuIcon
  duration: number
  price: number
}

export const TREATMENTS: Treatment[] = [
  {
    id: "body-massage",
    name: "Mayomi Body Massage",
    category: "Full Body Massage",
    description:
      "Serangkaian teknik pemijatan terukur dari kepala, leher, punggung, tangan, hingga kaki, dipadukan dengan minyak esensial aromaterapi pilihan untuk relaksasi mendalam, menenangkan pikiran, dan mengembalikan energi tubuh.",
    icon: "sparkles",
    options: [
      { duration: 60, price: 85000 },
      { duration: 90, price: 125000, popular: true },
      { duration: 120, price: 165000 },
    ],
  },
  {
    id: "reflexology",
    name: "Mayomi Reflexology",
    category: "Reflexology",
    description:
      "Berfokus pada titik-titik saraf di telapak kaki dan tangan yang merepresentasikan organ tubuh, efektif merangsang sistem saraf dan melancarkan aliran darah. Menggunakan krim aromaterapi untuk efek relaksasi instan.",
    icon: "heart",
    options: [
      { duration: 60, price: 90000, popular: true },
      { duration: 90, price: 130000 },
    ],
  },
  {
    id: "totok-wajah",
    name: "Totok Wajah",
    category: "Totok Wajah",
    description:
      "Teknik pijat khusus dan penekanan titik saraf di wajah, kepala, dan leher. Membantu membuang aura negatif, melancarkan peredaran darah, dan mengencangkan kulit secara alami.",
    icon: "leaf",
    options: [
      { duration: 30, price: 60000 },
      { duration: 60, price: 90000 },
    ],
  },
  {
    id: "facial-massage",
    name: "Facial Massage",
    category: "Facial Massage",
    description:
      "Diawali deep cleansing dan peeling, lalu pijat wajah dengan krim yang merangsang sirkulasi dan kolagen, masker kaya nutrisi, dan sentuhan akhir toner serta pelembap untuk kulit kencang, segar, dan glowing.",
    icon: "leaf",
    options: [
      { duration: 30, price: 70000 },
      { duration: 60, price: 100000 },
    ],
  },
  {
    id: "body-scrub",
    name: "Body Scrub",
    category: "Body Scrub",
    description:
      "Butiran scrub alami kaya nutrisi dengan pijatan melingkar yang lembut untuk membersihkan pori, merangsang regenerasi sel, dan menghaluskan tekstur kulit. Kulit lebih halus, lembap, dan bercahaya.",
    icon: "sparkles",
    options: [
      { duration: 30, price: 80000 },
      { duration: 60, price: 110000 },
    ],
  },
  {
    id: "foot-massage",
    name: "Foot Massage",
    category: "Foot Massage",
    description:
      "Kombinasi pijatan menenangkan di telapak, pergelangan, hingga betis untuk melancarkan sirkulasi dan meredakan kekakuan otot, membuat langkah kembali ringan dan berenergi.",
    icon: "heart",
    options: [{ duration: 30, price: 70000 }],
  },
  {
    id: "kerik",
    name: "Kerik",
    category: "Terapi Tradisional",
    description:
      "Alat kerik khusus dengan minyak aromaterapi di area punggung untuk membuka pori dan melancarkan aliran darah. Ampuh mengatasi masuk angin, perut kembung, sakit kepala, dan kelelahan.",
    icon: "zap",
    options: [{ duration: 30, price: 50000 }],
  },
  {
    id: "cupping",
    name: "Kop / Cupping Therapy",
    category: "Terapi Tradisional",
    description:
      "Alat khusus di punggung menciptakan tekanan sedot yang lembut tanpa sayatan atau pengeluaran darah. Membantu meredakan otot tegang dan melancarkan sirkulasi.",
    icon: "zap",
    options: [{ duration: 30, price: 50000 }],
  },
]

export const PACKAGES: MenuPackage[] = [
  {
    id: "radiant-aura",
    code: "Package A",
    name: "Mayomi Radiant Aura Package",
    includes: ["Body Massage 60 menit", "Totok Wajah 30 menit"],
    duration: 90,
    price: 140000,
  },
  {
    id: "glow-relax",
    code: "Package B",
    name: "Mayomi Glow & Relax Package",
    includes: ["Body Massage 60 menit", "Facial Massage 30 menit"],
    duration: 90,
    price: 145000,
    popular: true,
  },
  {
    id: "sole-to-body",
    code: "Package C",
    name: "Mayomi Sole to Body Package",
    includes: ["Body Massage 60 menit", "Reflexology 30 menit"],
    duration: 90,
    price: 150000,
  },
  {
    id: "scrub-soothe",
    code: "Package D",
    name: "Mayomi Scrub & Soothe Package",
    includes: ["Body Massage 60 menit", "Body Scrub 30 menit"],
    duration: 90,
    price: 155000,
  },
]

export const ADDONS: MenuAddon[] = [
  {
    id: "extra-body-massage",
    name: "Additional Time Body Massage",
    description: "Tambah 30 menit Body Massage",
    icon: "clock",
    duration: 30,
    price: 60000,
  },
  {
    id: "extra-reflexology",
    name: "Additional Time Reflexology",
    description: "Tambah 30 menit Reflexology",
    icon: "clock",
    duration: 30,
    price: 70000,
  },
  {
    id: "private-room",
    name: "Additional Private Room",
    description: "Upgrade ke private room, per 30 menit",
    icon: "plus",
    duration: 30,
    price: 30000,
  },
]

/** Lowest price among the core massage treatments, for "mulai dari" copy. */
export const STARTING_PRICE = Math.min(
  ...TREATMENTS[0].options.map((o) => o.price)
)

export const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

/** Compact "85K" style price, for tight UI like chips. */
export const formatK = (value: number) => `${Math.round(value / 1000)}K`

export const withTax = (value: number) => Math.round(value * (1 + TAX_RATE))
