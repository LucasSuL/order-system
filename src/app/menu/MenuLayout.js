// src/app/menu/MenuLayout.js
import Header from "./_components/Header";

const MenuLayout = ({ children }) => {
  return (
    <div className="bg-white">
      <Header />
      {children}
    </div>
  );
};

export default MenuLayout;
