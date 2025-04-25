import { randomUUID } from 'node:crypto'


export async function GET() {

  // CORS

  const data = [
    {
      id: randomUUID(),
      name: 'Administracao',
      categories: [
        {
          id: randomUUID(),
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
