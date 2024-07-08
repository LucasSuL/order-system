"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { foods, tags } from "@/config/product";

const Main = () => {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
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
      <div class="w-32 bg-white">
        <ScrollArea className="mt-1 border">
          <div className="">
            {tags.map((tag) => (
              <div key={tag} className="text-sm text-gray-600 mb-8">
                <Link
                  href={`#${tag}`}
                  className="hover:font-bold hover:text-black"
                >
                  {tag}
                </Link>
                {/* <Separator className="mt-3" /> */}
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
                        <Link
                          href={{
                            pathname: `/menu/preview/${sessionId}`,
                            query: { name: product.name, sum: sum },
                          }}
                        >
                          <Button
                            size="xs"
                            className="px-2"
                            // onClick={() => handleClick(product)}
                          >
                            加入Add
                          </Button>
                        </Link>
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
