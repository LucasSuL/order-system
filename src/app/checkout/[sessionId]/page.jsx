"use client";

import Header from "@/app/menu/_components/Header";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const cart = JSON.parse(searchParams.get("cart"));
  const sum = searchParams.get("sum");
  console.log(cart);

  return (
    <div>
      <Header />
      <div class="p-2 pt-24 h-screen bg-slate-100">
        <div className="p-2 bg-white">
          <p className="mb-3">Table Number: 3A</p>
        </div>

        <div className="p-2 bg-white mt-2">
          {cart.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between align-middle">
                <div className="flex flex-col">
                  <p className="font-bold text-lg">{item.name_eng}</p>
                  <p className="text-gray-500">{item.name}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-bold text-lg">${item.price}</p>
                  <p>
                    <span className="text-xs">x</span>
                    {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white mt-2 p-2">
          <p className="mb-1">备注：</p>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 bg-black h-[60px] w-full z-50 flex">
        <div className="w-2/3 bg-gray-200 p-4 flex items-center gap-4">
          <ShoppingBag className="w-8 h-8" />
          <p>
            $<strong className="text-xl"> {sum}</strong>
          </p>
        </div>
        <Link
          href={"/"}
          className="w-1/3 bg-black p-1 text-center align-middle"
        >
          <p className="font-bold text-lime-50 text-lg">Submit</p>
          <p className="text-sm text-gray-300">提交</p>
        </Link>
      </footer>
    </div>
  );
};

export default CheckoutPage;
