let orders = [];

export async function POST(req) {
  const order = await req.json();
  orders.push(order);
  global.io.emit('order', order);
  return new Response(JSON.stringify(order), { status: 201 });
}

export async function GET() {
  return new Response(JSON.stringify(orders), { status: 200 });
}
