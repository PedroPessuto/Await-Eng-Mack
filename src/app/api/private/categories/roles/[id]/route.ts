export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const res = await fetch(`http://localhost:3001/categories-roles/${id}`);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Categoria não encontrada' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    const data = await res.json();
    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao buscar categoria' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const payload = await request.json();
    const res = await fetch(`http://localhost:3001/categories-roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorText = await res.text();
      return new Response(JSON.stringify({ error: errorText }), { status: res.status, headers: { 'Content-Type': 'application/json' } });
    }
    const data = await res.json();
    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao atualizar categoria' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const res = await fetch(`http://localhost:3001/categories-roles/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Falha ao excluir categoria' }), { status: res.status, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(null, { status: 204 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao excluir categoria' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}