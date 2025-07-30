export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  brand: string
  images: string[]
  colors: string[]
  sizes: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isNew: boolean
  isBestSeller: boolean
  isFavorite: boolean;
  tags: string[]
  createdAt: string
}

export interface ProductFilters {
  category: string
  priceRange: [number, number]
  colors: string[]
  sizes: string[]
  brands: string[]
  sortBy: string
}

export interface OutfitCollection {
  id: string
  name: string
  description: string
  heroImage: string
  outfits: Outfit[]
}

export interface Outfit {
  id: string
  name: string
  image: string
  totalPrice: number
  originalPrice?: number
  items: string[]
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  images?: string[]
}
