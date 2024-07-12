"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { foods, tags } from "@/config/product";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Main = () => {
  const [goal, setGoal] = useState(1);
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const handleSauceChange = (e) => setSelectedSauce(e.target.value);
  const [selectedSauce, setSelectedSauce] = useState("四川麻辣炸串酱");

  function onClick(adjustment) {
    setGoal(goal + adjustment);
  }

  useEffect(() => {
    let id = uuidv4();
    setSessionId(id);
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
    <div className="p-4 pt-24 flex overflow-hidden h-screen relative">
      <div className="w-32 bg-white">
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
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button size="xs" className="px-2">
                              加入Add
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <div className="p-2 px-4 w-full max-w-sm">
                              <div className="w-full">
                                <Image
                                  src={product.img}
                                  alt="img"
                                  width={200}
                                  height={200}
                                ></Image>
                                <p className="mt-2 font-bold text-2xl">
                                  {product.name_eng}{" "}
                                  <span className="font-medium">
                                    {product.name}
                                  </span>
                                </p>
                                <p> {product.desc}</p>
                                <div className="bg-slate-200 p-2 mt-5 rounded-md">
                                  <p className="font-bold mb-1">
                                    Sauce Choice (1 max):
                                  </p>
                                  <fieldset className="space-y-3">
                                    <div>
                                      <label
                                        htmlFor="SourceOp1"
                                        className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-black has-[:checked]:ring-1 has-[:checked]:ring-black"
                                      >
                                        <p className="text-gray-700">
                                          四川麻辣炸串酱 Spicy Szechuan Sauce
                                          (recommended)
                                        </p>

                                        <p className="text-gray-900">free</p>

                                        <input
                                          type="radio"
                                          name="SauceOption"
                                          value="四川麻辣炸串酱"
                                          id="SourceOp1"
                                          className="sr-only"
                                          checked={
                                            selectedSauce === "四川麻辣炸串酱"
                                          }
                                          onChange={handleSauceChange}
                                        />
                                      </label>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor="SauceOp2"
                                        className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-black has-[:checked]:ring-1 has-[:checked]:ring-black"
                                      >
                                        <p className="text-gray-700">
                                          麻辣底炸串酱微辣 Mild Sesame Paste
                                          Sauce
                                        </p>

                                        <p className="text-gray-900">free</p>

                                        <input
                                          type="radio"
                                          name="SauceOption"
                                          value="麻辣底炸串酱微辣"
                                          id="SauceOp2"
                                          className="sr-only"
                                          checked={
                                            selectedSauce === "麻辣底炸串酱微辣"
                                          }
                                          onChange={handleSauceChange}
                                        />
                                      </label>
                                    </div>
                                  </fieldset>
                                  <p className="font-bold mb-1 mt-3">
                                    Other option (2 max):
                                  </p>
                                  <fieldset className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label
                                        htmlFor="SpringOnion"
                                        className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-green-500 has-[:checked]:ring-1 has-[:checked]:ring-green-500"
                                      >
                                        <div>
                                          <p className="text-gray-700">
                                            免葱 No Spring Onion
                                          </p>
                                        </div>

                                        <input
                                          type="checkbox"
                                          name="DeliveryOption"
                                          value="SpringOnion"
                                          id="SpringOnion"
                                          className="sr-only"
                                        />
                                      </label>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor="DeliveryPriority"
                                        className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-green-500 has-[:checked]:ring-1 has-[:checked]:ring-green-500"
                                      >
                                        <div>
                                          <p className="text-gray-700">
                                            加辣 Extra Spicy
                                          </p>

                                          <p className="text-gray-900">
                                            (free)
                                          </p>
                                        </div>

                                        <input
                                          type="checkbox"
                                          name="DeliveryOption"
                                          value="DeliveryPriority"
                                          id="DeliveryPriority"
                                          className="sr-only"
                                        />
                                      </label>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>

                              <div className="p-4 pb-0">
                                <div className="flex justify-between align-middle">
                                  <div className="flex align-middle">
                                    <p className="mt-1">Amount </p>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 shrink-0 rounded-full"
                                      onClick={() => onClick(-1)}
                                      disabled={goal <= 1}
                                    >
                                      <Minus className="h-4 w-4" />
                                      <span className="sr-only">Decrease</span>
                                    </Button>

                                    <div className="text-2xl font-bold tracking-tighter">
                                      {goal}
                                    </div>

                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 shrink-0 rounded-full"
                                      onClick={() => onClick(1)}
                                    >
                                      <Plus className="h-4 w-4" />
                                      <span className="sr-only">Increase</span>
                                    </Button>
                                  </div>

                                  <div className="text-[0.90rem] uppercase text-muted-foreground mt-1">
                                    份
                                  </div>
                                </div>
                              </div>
                              <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                              </DrawerFooter>
                            </div>
                          </DrawerContent>
                        </Drawer>
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
