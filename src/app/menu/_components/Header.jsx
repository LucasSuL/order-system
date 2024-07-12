import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="fixed w-full z-50">
      <Image className="w-full" src='/shop_banner.png' width={300} height={100} alt='shop'></Image>
      {/* <div className="my-3 mx-3">
        <h1 className="text-2xl font-bold  sm:text-3xl">
          xx餐厅
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">
        🎉满100减10🎉
        </p>
      </div> */}
    </header>
  );
};

export default Header;
