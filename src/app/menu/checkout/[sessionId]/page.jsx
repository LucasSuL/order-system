"use client";

import Header from "@/app/menu/_components/Header";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// interface Order {
//   table: string;
//   name: string;
//   quantity: number;
//   remarks?: string;
// };
const TestTable = "Testing table";

const placeOrder = async (cart) => {
  console.log("Now placing order:");
  try {
    console.log(
      cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
      }))
    );

    const responseData = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        cart.map((item) => ({
          table: TestTable,
          name: item.name,
          quantity: item.quantity,
          remarks: item.remarks,
        }))
      ),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to submit order: " + response.statusText);
    });
    // console.log('Order response:-------------------', responseData);

    alert("订单已提交");
  } catch (error) {
    console.error("catched error in placeOrder():", error);
    alert(`Error submitting order: ${error.message}`);
  }
};

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const cart = JSON.parse(searchParams.get("cart"));
  const sum = searchParams.get("sum");
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="relative h-screen ">
      <Header />
      <div className="p-4 pt-40 pb-16 h-full bg-slate-100">
        <div className="p-2 bg-white rounded-md">
          <p className="">
            Table Number: <span className="font-bold">3A</span>
          </p>
        </div>

        <div className="p-2 bg-white mt-2 rounded-md">
          {cart.map((item, index) => (
            <div key={index} className="mb-3 flex justify-between align-top">
              <div className="flex flex-col justify-between align-middle">
                <div className="flex gap-2 mb-1">
                  <p className="font-bold">{item.name_eng}</p>
                  <p className="font-bold">{item.name}</p>
                </div>
                <div className="text-gray-500 text-sm">
                  <p>{item.sauce}</p>
                  {item.option.length > 0 ? (
                    item.option.map((opt, index) => (
                      <div key={index}>{opt}</div>
                    ))
                  ) : (
                    <div></div>
                  )}
                  {item.special && <p>备注：{item.special}</p>}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold text-lg">${item.price}</p>
                <p>
                  <span className="text-xs">x</span>
                  {item.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white mt-2 p-2 rounded-md">
          <p className="mb-1">Special instruction: </p>
          <Textarea
            placeholder="Type your notes here."
            value={userInput}
            onChange={handleInputChange}
          />{" "}
        </div>
        <div className="bg-white mt-2 p-2 mb-16 rounded-md">
          <p className="mb-1">Suggestion：</p>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 bg-black h-[60px] w-full z-50 flex">
        <div className="w-2/3 bg-gray-200 p-4 flex items-center gap-4">
          <ShoppingBag className="w-8 h-8" />
          <p>
            $<strong className="text-xl"> {sum}</strong>
          </p>
        </div>
        <Link
          href={"/"}
          className="w-1/3 bg-black p-1 m-0 flex justify-center items-center"
          onClick={() => placeOrder(cart)}
        >
          <p className="font-bold text-lime-50 text-lg">Submit Order</p>
        </Link>
      </footer>
    </div>
  );
};

export default CheckoutPage;
