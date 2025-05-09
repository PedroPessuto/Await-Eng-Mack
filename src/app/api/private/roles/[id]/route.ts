
const JSON_SERVER_URL = 'http://127.0.0.1:59668/api/'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const res = await fetch(`${JSON_SERVER_URL}/roles/${id}`)
  if (!res.ok) {
    return Response.json({ error: 'Role não encontrada' }, { status: 404 })
  }
  const data = await res.json()
  return Response.json({ data })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const updates = await request.json()
  const res = await fetch(`${JSON_SERVER_URL}/roles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!res.ok) {
    return Response.json({ error: 'Falha ao atualizar' }, { status: 500 })
  }
  const data = await res.json()
  return Response.json({ data })
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const res = await fetch(`${JSON_SERVER_URL}/roles/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    return Response.json({ error: 'Falha ao deletar' }, { status: 500 })
  }
  return Response.json({ message: 'Deletado com sucesso' })
}