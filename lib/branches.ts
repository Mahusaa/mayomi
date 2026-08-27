export interface Branch {
  id: string
  name: string
  area: string
  city: string
  address: string
  /** Set to false when the street address is still area-level only. */
  addressConfirmed: boolean
  phone: string
  /** International format, digits only, for wa.me links. */
  whatsapp: string
  mapsQuery: string
  hours: string
  /** Highlights shown as chips on the branch card. */
  tags: string[]
  image: string
  featured?: boolean
  /** Set for branches that have not opened yet. */
  openingSoon?: boolean
}

export const OPERATING_HOURS = "09.00 - 22.00 WIB"

export const BRANCHES: Branch[] = [
  {
    id: "pasar-minggu",
    name: "Mayomi Pasar Minggu",
    area: "Pasar Minggu",
    city: "Jakarta Selatan",
    address:
      "Jl. Gabus Raya No.34A, RT.4/RW.9, Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12520",
    addressConfirmed: true,
    phone: "0852-1258-6168",
    whatsapp: "6285212586168",
    mapsQuery:
      "Jl. Gabus Raya No.34A, RT.4/RW.9, Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12520",
    hours: OPERATING_HOURS,
    tags: ["Cabang Pertama", "Couple Room", "Parkir Luas"],
    image: "/gallery4.jpg",
    featured: true,
  },
  {
    id: "kebayoran-lama",
    name: "Mayomi Kebayoran Lama",
    area: "Kebayoran Lama",
    city: "Jakarta Selatan",
    address: "Kebayoran Lama, Kota Jakarta Selatan, DKI Jakarta",
    addressConfirmed: false,
    phone: "0858-8100-2850",
    whatsapp: "6285881002850",
    mapsQuery: "Mayomi Family Massage Kebayoran Lama Jakarta Selatan",
    hours: OPERATING_HOURS,
    tags: ["Dekat Cipulir", "Ruang Ber-AC", "Walk-in Friendly"],
    image: "/gallery1.jpg",
  },
  {
    id: "bintaro",
    name: "Mayomi Bintaro",
    area: "Citra Garden Bintaro",
    city: "Tangerang Selatan",
    address: "Citra Garden Bintaro, Pondok Aren, Kota Tangerang Selatan, Banten",
    addressConfirmed: false,
    phone: "0815-9898-803",
    whatsapp: "628159898803",
    mapsQuery: "Mayomi Family Massage Citra Garden Bintaro",
    hours: OPERATING_HOURS,
    tags: ["Couple Room", "Paket Scrub", "Area Ruko"],
    image: "/gallery2.jpg",
  },
  {
    id: "gading-serpong",
    name: "Mayomi Gading Serpong",
    area: "Ruko Opal, Summarecon Serpong",
    city: "Tangerang",
    address: "Ruko Opal, Summarecon Serpong, Gading Serpong, Kabupaten Tangerang, Banten",
    addressConfirmed: false,
    phone: "0877-7065-8989",
    whatsapp: "6287770658989",
    mapsQuery: "Mayomi Family Massage Ruko Opal Summarecon Serpong Gading Serpong",
    hours: OPERATING_HOURS,
    tags: ["Cabang Terbaru", "Ruang Baru", "Parkir Ruko"],
    image: "/gallery3.jpg",
  },
]

export const mapsUrl = (branch: Branch) =>
  `https://maps.google.com/?q=${encodeURIComponent(branch.mapsQuery)}`

export const waUrl = (branch: Branch, message?: string) =>
  `https://wa.me/${branch.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`

export const telUrl = (branch: Branch) => `tel:${branch.phone.replace(/-/g, "")}`

/** The branch used for generic, non-branch-specific contact links. */
export const PRIMARY_BRANCH = BRANCHES[0]
