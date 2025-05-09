
export type Role = {
  id: string
  name: string
  description?: string
  categories: Category[]
}

export type Category = {
  id: string
  name: string
}

