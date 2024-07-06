'use client';

import { useState } from 'react';
import { socket } from '@/utils/socket';

const menu = [
  { id: 1, name: 'Dish 1', price: 10 },
  { id: 2, name: 'Dish 2', price: 20 },
  // 添加更多菜品
];

const Menu = () =>
{
  const [order, setOrder] = useState([]);
  const [tableNumber, setTableNumber] = useState(0);

  const handleOrder = (item) =>
  {
    setOrder((prevOrder) =>
    {
      // 确保不会重复添加同一个菜品
      if (prevOrder.some(orderItem => orderItem.id === item.id)) {
        return prevOrder.filter(orderItem => orderItem.id !== item.id);
      } else {
        return [...prevOrder, item];
      }
    });
  };

  const placeOrder = async () =>
  {
    console.log('Placing order:', order);
    console.log('Table number:', tableNumber);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            tableNumber,
            items: order.map(item => item.name),
            count: 1,
          }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit order: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Order response:', responseData);

      alert('订单已提交');
      setOrder([]);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(`Error submitting order: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Menu</h1>
      <input
        type="text"
        placeholder="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
      />
      <div id="menu">
        {menu.map(item => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={`item${item.id}`}
              onChange={() => handleOrder(item)}
            />
            {item.name} - ${item.price}
          </div>
        ))}
      </div>
      <button onClick={placeOrder} className="mt-4 bg-blue-500 text-white p-2">下单</button>
    </div>
  );
};

export default Menu;
