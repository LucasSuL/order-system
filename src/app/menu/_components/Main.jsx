"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const tags = [
  "烤串",
  "主食",
  "饮料",
  "凉菜",
  "热菜",
  "甜品",
  "汤类",
  "烧烤",
  "海鲜",
  "素菜",
  "肉类",
  "小吃",
];

const foods = [
  {
    cat: "烤串",
    products: [
      {
        name: "羊肉串",
        name_eng: "Lamb Skewers",
        price: "20",
        desc: "香嫩多汁的羊肉串",
        img: "https://picsum.photos/200",
      },
      {
        name: "牛肉串",
        name_eng: "Beef Skewers",
        price: "30",
        desc: "美味可口的牛肉串",
        img: "https://picsum.photos/200",
      },
      {
        name: "鸡肉串",
        name_eng: "Chicken Skewers",
        price: "25",
        desc: "鲜嫩多汁的鸡肉串",
        img: "https://picsum.photos/200",
      },
      {
        name: "猪肉串",
        name_eng: "Pork Skewers",
        price: "22",
        desc: "香酥入味的猪肉串",
        img: "https://picsum.photos/200",
      },
      {
        name: "蔬菜串",
        name_eng: "Vegetable Skewers",
        price: "15",
        desc: "健康美味的蔬菜串",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "主食",
    products: [
      {
        name: "烤馒头",
        name_eng: "Baked Mantou",
        price: "10",
        desc: "香脆的烤馒头",
        img: "https://picsum.photos/200",
      },
      {
        name: "烤面包",
        name_eng: "Toasted Bread",
        price: "15",
        desc: "松软的烤面包",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "饮料",
    products: [
      {
        name: "可乐",
        name_eng: "Cola",
        price: "5",
        desc: "清爽解渴的可乐",
        img: "https://picsum.photos/200",
      },
      {
        name: "雪碧",
        name_eng: "Sprite",
        price: "5",
        desc: "冰凉可口的雪碧",
        img: "https://picsum.photos/200",
      },
      {
        name: "橙汁",
        name_eng: "Orange Juice",
        price: "6",
        desc: "新鲜的橙汁",
        img: "https://picsum.photos/200",
      },
      {
        name: "啤酒",
        name_eng: "Beer",
        price: "8",
        desc: "冰镇的啤酒",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "凉菜",
    products: [
      {
        name: "凉拌黄瓜",
        name_eng: "Cucumber Salad",
        price: "12",
        desc: "清爽的凉拌黄瓜",
        img: "https://picsum.photos/200",
      },
      {
        name: "凉拌海带丝",
        name_eng: "Seaweed Salad",
        price: "15",
        desc: "美味的凉拌海带丝",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "热菜",
    products: [
      {
        name: "宫保鸡丁",
        name_eng: "Kung Pao Chicken",
        price: "25",
        desc: "经典的宫保鸡丁",
        img: "https://picsum.photos/200",
      },
      {
        name: "红烧排骨",
        name_eng: "Braised Pork Ribs",
        price: "35",
        desc: "香嫩的红烧排骨",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "甜品",
    products: [
      {
        name: "冰淇淋",
        name_eng: "Ice Cream",
        price: "10",
        desc: "香草味冰淇淋",
        img: "https://picsum.photos/200",
      },
      {
        name: "蛋挞",
        name_eng: "Egg Tart",
        price: "8",
        desc: "酥脆的蛋挞",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "汤类",
    products: [
      {
        name: "西红柿鸡蛋汤",
        name_eng: "Tomato Egg Soup",
        price: "12",
        desc: "营养的西红柿鸡蛋汤",
        img: "https://picsum.photos/200",
      },
      {
        name: "酸辣汤",
        name_eng: "Hot and Sour Soup",
        price: "14",
        desc: "开胃的酸辣汤",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "烧烤",
    products: [
      {
        name: "烤鸡翅",
        name_eng: "Grilled Chicken Wings",
        price: "20",
        desc: "香喷喷的烤鸡翅",
        img: "https://picsum.photos/200",
      },
      {
        name: "烤玉米",
        name_eng: "Grilled Corn",
        price: "10",
        desc: "甜美的烤玉米",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "海鲜",
    products: [
      {
        name: "烤虾",
        name_eng: "Grilled Prawns",
        price: "30",
        desc: "鲜美的烤虾",
        img: "https://picsum.photos/200",
      },
      {
        name: "烤扇贝",
        name_eng: "Grilled Scallops",
        price: "35",
        desc: "美味的烤扇贝",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "素菜",
    products: [
      {
        name: "炒时蔬",
        name_eng: "Stir-fried Vegetables",
        price: "15",
        desc: "新鲜的炒时蔬",
        img: "https://picsum.photos/200",
      },
      {
        name: "麻婆豆腐",
        name_eng: "Mapo Tofu",
        price: "18",
        desc: "香辣的麻婆豆腐",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "肉类",
    products: [
      {
        name: "红烧牛肉",
        name_eng: "Braised Beef",
        price: "40",
        desc: "浓郁的红烧牛肉",
        img: "https://picsum.photos/200",
      },
      {
        name: "香煎猪排",
        name_eng: "Pan-fried Pork Chop",
        price: "30",
        desc: "美味的香煎猪排",
        img: "https://picsum.photos/200",
      },
    ],
  },
  {
    cat: "小吃",
    products: [
      {
        name: "炸薯条",
        name_eng: "French Fries",
        price: "10",
        desc: "酥脆的炸薯条",
        img: "https://picsum.photos/200",
      },
      {
        name: "鸡米花",
        name_eng: "Popcorn Chicken",
        price: "12",
        desc: "美味的鸡米花",
        img: "https://picsum.photos/200",
      },
    ],
  },
];

const Main = () => {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [serialCart, setSerialCart] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Generate a unique session ID if not already present
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
    setSessionId(sessionId);
  }, []);

  const calcSum = () => {
    const sum = cart.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    setSum(sum);
  };

  useEffect(() => {
    calcSum();
    // Serialize cart object to a string
    // setSerialCart(JSON.stringify(cart));
  }, [cart]);

  const handleClick = (product) => {
    const newProduct = { ...product, quantity: 1 };
    setCart([...cart, newProduct]);
    console.log(sum);
  };

  const handleAdd = (name) => {
    setCart(
      cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleMinus = (name) => {
    setCart(
      cart
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const isInCart = (name) => {
    return cart.some((item) => item.name === name);
  };

  const handleSubmit = () => {
    console.log(cart);
  };

  return (
    <div class="p-4 pt-24 flex overflow-hidden h-screen relative">
      <div class="w-32 bg-white shadow-lg">
        <ScrollArea className="mt-1">
          <div className="">
            {tags.map((tag) => (
              <div key={tag} className="text-sm text-gray-600 mb-3">
                <Link
                  href={`#${tag}`}
                  className="hover:font-bold hover:text-black"
                >
                  {tag}
                </Link>
                <Separator className="mt-3" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <ScrollArea className="w-full">
        <div className="">
          {foods.map((food) => (
            <div key={food.cat} className="text-md mb-5">
              <div className="font-bold mb-2" id={food.cat}>
                {" "}
                {food.cat}
              </div>
              {food.products.map((product) => (
                <div key={product.name} className="flex gap-3 mb-6">
                  <Image
                    className="object-cover w-[80px] h-[70px] mt-2"
                    src={product.img}
                    width={80}
                    height={70}
                    alt={product.name}
                  ></Image>
                  <div className="w-full">
                    <div className="font-bold text-lg">{product.name_eng}</div>
                    <div className="font-bold mb-1">{product.name}</div>
                    <div className="text-xs text-slate-600 mb-2">
                      {product.desc}
                    </div>
                    <div className="flex justify-between align-middle font-bold">
                      ${product.price}
                      {isInCart(product.name) ? (
                        <div className="flex items-center gap-2">
                          <Button
                            className="rounded-full "
                            size="xs"
                            variant="outline"
                            onClick={() => handleMinus(product.name)}
                          >
                            <Minus className="w-5 h-5" />
                          </Button>
                          <span>
                            {
                              cart.find((item) => item.name === product.name)
                                .quantity
                            }
                          </span>
                          <Button
                            className="rounded-full "
                            size="xs"
                            variant="outline"
                            onClick={() => handleAdd(product.name)}
                          >
                            <Plus className="w-5 h-5" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="xs"
                          className="px-2"
                          onClick={() => handleClick(product)}
                        >
                          加入Add
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>

      {cart.length > 0 && (
        <footer className="absolute bottom-0 left-0 bg-black h-[60px] w-full z-50 flex">
          <div className="w-2/3 bg-gray-200 p-4 flex items-center gap-4">
            <ShoppingBag className="w-8 h-8" />
            <p>
              $<strong className="text-xl"> {sum}</strong>
            </p>
          </div>
          <Link
            href={{
              pathname: `/checkout/${sessionId}`,
              query: { cart: JSON.stringify(cart), sum: sum },
            }}
            className="w-1/3 bg-black p-1 text-center align-middle"
          >
            <p className="font-bold text-lime-50 text-lg">Checkout </p>
            <p className="text-sm text-gray-300">结算 </p>
          </Link>
        </footer>
      )}
    </div>
  );
};

export default Main;
