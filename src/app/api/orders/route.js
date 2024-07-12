let orders = [];
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
export async function POST(req)
{
  console.log("Get into the POST function");

  try {

    const { items } = await req.json();
    console.log('+++++++++++++++++++++++++++++++Received order:', items);
    // items.map(i => order.push(i));
    orders.push(items);

    // if (global.io) {
    //   global.io.emit('order', orders);
    // } else {
    //   console.error('Socket.IO instance not found');
    // }
  } catch (error) {
    console.error('Error processing POST request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }

  return new Response(JSON.stringify(order), { status: 201 });
}

export async function GET()
{
  return new Response(JSON.stringify(orders), { status: 200 });
}


/*
console.log("testing");

let orders = [];

export default function handler(req, res)
{
  if (req.method === 'POST') {
    handlePostRequest(req, res);
  } else if (req.method === 'GET') {
    handleGetRequest(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePostRequest(req, res)
{
  try {
    const order = req.body; // Make sure your body parser is set correctly in Next.js (default support is there)
    orders.push(order);
    global.io.emit('order', order);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error processing POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGetRequest(req, res)
{
  try {
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error processing GET request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

*/