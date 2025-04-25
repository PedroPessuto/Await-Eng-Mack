import type { Roles } from '../enums/Roles'

export type Member = {
  id: string
  avatar?: string | null
  username: string
  email: string
  role: Roles
}
