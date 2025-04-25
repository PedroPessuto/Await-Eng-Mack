import { randomUUID } from 'node:crypto'

export async function GET() {

  // CORS

  const data = [
    {
      id: randomUUID(),
      avatar: null,
      username: 'Pedro',
      email: 'email@email.com',
    },
  ]

  return Response.json({ data })
}
