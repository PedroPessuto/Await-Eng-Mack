import { randomUUID } from 'node:crypto'


export async function GET() {

  // CORS

  const data = [
    {
      id: "3bc69a18-ae0f-4ba2-bf1f-84ab4b8564d9",
      name: 'Administracao',
      categories: [
        {
          id: "3bc69a18-ae0f-4ba2-bf1f-84ab4b8564d9",
          name: 'Global',
        },
        {
          id: "e03a8189-2f6f-466d-86c5-d4ba5c25c05d",
          name: 'Caixa',
        }
      ],
    },
    {
      id: randomUUID(),
      name: 'Funcionario',
      categories: [
        {
          id: "e03a8189-2f6f-466d-86c5-d4ba5c25c05d",
          name: 'Caixa',
        }
      ],
    },
  ]

  return Response.json({ data })
}
