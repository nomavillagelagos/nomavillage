export interface BlogAuthor {
  name: string
  avatar_url?: string | null
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author: BlogAuthor
  tags: string[]
  category: string
  featured_image?: string | null
  created_at: string
  updated_at: string
  published_at: string
  read_time: number
  is_featured?: boolean
  meta_title?: string
  meta_description?: string
}
