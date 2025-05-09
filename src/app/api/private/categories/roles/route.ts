export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const res = await fetch('http://localhost:3001/categories-roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorText = await res.text();
      return new Response(JSON.stringify({ error: errorText }), { status: res.status, headers: { 'Content-Type': 'application/json' } });
    }
    const data = await res.json();
    return new Response(JSON.stringify({ data }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro ao criar categoria' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}