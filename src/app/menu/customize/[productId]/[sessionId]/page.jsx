"use client";

import React from "react";
import MenuLayout from "../../../MenuLayout";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const Customize = () => {
  const searchParams = useSearchParams();
  const product = JSON.parse(searchParams.get("product"));
  console.log(product);
  return (
    <MenuLayout>
      {product ? (
        <div className="p-4 pt-24 flex overflow-hidden h-screen relative">
          <div className="w-full">
            <Image src={product.img} alt="img" width={300} height={300}></Image>
            <p className="mt-2 font-bold text-2xl">
              {product.name_eng}{" "}
              <span className="font-medium text-gray-600">{product.name}</span>
            </p>
            <p> {product.desc}</p>
            <div className="bg-slate-200 p-2 mt-5 rounded-md">
              <p className="font-bold">XXX Choice:</p>
            </div>
          </div>
          <footer className="absolute bottom-0 left-0 bg-black h-[60px] w-full z-50 flex"></footer>
        </div>
      ) : (
        <div className="p-4 pt-24 flex overflow-hidden h-screen relative">
          Loading
        </div>
      )}
    </MenuLayout>
  );
};

export default Customize;
