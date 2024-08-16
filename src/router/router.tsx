import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";
import Fashion from "../views/Fashion";
import Accessory from "../views/Accessory";
import Digital from "../views/Digital";
import Cart from "../views/Cart";
import Products from "../views/Products";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route path="/products/:id" element={<Products />} />
      <Route path="/fashion" element={<Fashion/>} />
      <Route path="/accessory" element={<Accessory />} />
      <Route path="/digital" element={<Digital />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default memo(Router);
