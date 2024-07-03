'use client';

import { useState } from 'react';
import { socket } from '@/utils/socket';

const menu = [
  { id: 1, name: 'Dish 1', price: 10 },
  { id: 2, name: 'Dish 2', price: 20 },
  // 添加更多菜品
];

const Menu = () => {
  const [order, setOrder] = useState([]);

  const handleOrder = (item) => {
    setOrder((prevOrder) => [...prevOrder, item]);
  };

  const placeOrder = async () => {
    console.log(order);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      alert('订单已提交');
      setOrder([]);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Menu</h1>
      <div id="menu">
        {menu.map(item => (
          <div key={item.id}>
            <input type="checkbox" id={`item${item.id}`} onChange={() => handleOrder(item)} />
            {item.name} - ${item.price}
          </div>
        ))}
      </div>
      <button onClick={placeOrder} className="mt-4 bg-blue-500 text-white p-2">下单</button>
    </div>
  );
};

export default Menu;
