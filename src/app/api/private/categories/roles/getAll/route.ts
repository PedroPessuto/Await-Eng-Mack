
export async function GET() {

  const data = [
    {
      id: "3bc69a18-ae0f-4ba2-bf1f-84ab4b856488",
      name: 'Global',
    },
    {
      id: "3bc69a18-ae0f-4ba2-b22f-84ab4b856488",
      name: 'Caixa',
    },
    {
      id: "3bc69a18-ae0f-4ba2-4444-84ab4b856488",
      name: 'Gerente',
    },
  ]

  return Response.json({ data })
}
