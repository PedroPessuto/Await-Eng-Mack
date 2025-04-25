import type { Member } from '@/lib/models/Member'
import { cookies } from 'next/headers'
import { MembersDataTable } from './MembersDataTable/MembersDataTable'

interface GetMemberFetchProps {
  data: Member[],
  error?: string
}

export async function Overview() {
  let members: Member[] = []
  let error: string | undefined = undefined

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const response = await fetch(`${baseUrl}/api/private/members/get`, {
    method: "GET",
    headers: { cookie: cookieHeader },
  })

  if (!response.ok) {
    try {
      const json = await response.json()
      error = json.error || 'Erro ao carregar sua solicitação'
    } catch {
      error = 'Erro ao carregar sua solicitação'
    }
  } 
  else {
    try {
      const json = await response.json() as GetMemberFetchProps
      members = json.data ?? []
      if (json.error) error = json.error
    } catch {
      error = 'Erro ao ler os dados'
    }
  }

  return <MembersDataTable data={members} error={error} />
}
