
const JSON_SERVER_URL = 'http://127.0.0.1:59668/api/'

export async function GET() {

  // const data = [
  //   {
  //     id: "3bc69a18-ae0f-4ba2-bf1f-84ab4b8564d9",
  //     name: 'Administracao',
  //     categories: [
  //       {
  //         id: "3bc69a18-ae0f-4ba2-bf1f-84ab4b8564d9",
  //         name: 'Global',
  //       },
  //       {
  //         id: "e03a8189-2f6f-466d-86c5-d4ba5c25c05d",
  //         name: 'Caixa',
  //       }
  //     ],
  //   },
  //   {
  //     id: "3bc69a18-ae0f-5ba2-bf1f-84ab4b8564d9",
  //     name: 'Funcionario',
  //     categories: [
  //       {
  //         id: "e03a8189-2f6f-466d-86c5-d4ba5c25c05d",
  //         name: 'Caixa',
  //       }
  //     ],
  //   },
  // ]
  const res = await fetch(`${JSON_SERVER_URL}/roles`)
  const data = await res.json()

  return Response.json({ data })
}

export async function POST(request: Request) {
  const role = await request.json()
  const res = await fetch(`${JSON_SERVER_URL}/roles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(role),
  })
  const data = await res.json()

  return Response.json({ data }, { status: 201 })
}
