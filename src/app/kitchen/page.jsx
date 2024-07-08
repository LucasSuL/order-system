'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/utils/socket';


const Kitchen = () =>
{
  const [orders, setOrders] = useState([]);

  useEffect(() =>
  {
    fetch('http://localhost:3000/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response =>
      {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch orders:', response.statusText);
        }
      })
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));


    socket.on('updateKitchenOrders', (order) =>
    {
      setOrders(order);
      // const audio = new Audio('/notification.mp3');
      // audio.play();
    });

    return () =>
    {
      socket.off('order');
    };
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">厨房订单</h1>
      <div id="orders">
        {orders.map((order, index) => (
          <div key={index}>新订单: {JSON.stringify(order)}</div>
        ))}
      </div>
    </div>
  );
};

export default Kitchen;
