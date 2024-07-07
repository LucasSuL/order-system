"use client";

import { useState } from "react";
import { socket } from "@/utils/socket";
import Header from "./_components/Header";
import Main from "./_components/Main";

const menu = [
  { id: 1, name: "Dish 1", price: 10 },
  { id: 2, name: "Dish 2", price: 20 },
  // 添加更多菜品
];

const Menu = () => {
  const [order, setOrder] = useState([]);
  const [tableNumber, setTableNumber] = useState(0);

  const handleOrder = (item) => {
    setOrder((prevOrder) => {
      // 确保不会重复添加同一个菜品
      // if (prevOrder.some((orderItem) => orderItem.id === item.id)) {
      //   return prevOrder.filter((orderItem) => orderItem.id !== item.id);
      // } else {
        return [...prevOrder, item];
      // }
    });
  };


  return (
    <div className="bg-white">
      <Header />
      <Main />
    </div>
  );
};

export default Menu;
