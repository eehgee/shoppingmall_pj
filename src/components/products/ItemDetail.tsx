import { useState, useEffect } from "react";


import { Link } from 'react-router-dom';
import { Category } from '../../constants/category';
import { IProduct } from '../../store/products';
import BreadCrumb from '../common/Breadcrumb';
import Rating from '../common/Rating';
import Error from '../../views/Error';

import { useRecoilState } from 'recoil';
import { cartState, addToCart } from '../../store/cart';


const ItemDetail = ({ item }: { item: IProduct }) => {

  const [cart, setCart] = useRecoilState(cartState);


  if (!item) {
    return <Error />;
  }

  const categoryKey = item.category; 
  const categoryName = Category[categoryKey] || categoryKey;

  const rounding = Math.round(item.price);

  const handleAddToCart = () => {
    const cartItem = {
      id: item.id,
      count: 1,
      title: item.title,
      price: item.price,
      image: item.image,
    };
    setCart((prevCart) => addToCart(prevCart, cartItem));
  };

  return (
    <div className="container mx-auto p-6">
      <BreadCrumb category={categoryName} crumb={item.title} />
      <div className="flex flex-col lg:flex-row pt-8">
        {/* 이미지 */}
        <div className="w-full lg:w-1/4 bg-white rounded-2xl overflow-hidden mb-6 lg:mb-0 h-64 relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain p-6"
          />
        </div>
        {/* 상세정보 */}
        <div className="w-full lg:w-1/2 lg:pl-10">
          <h1 className="text-xl font-bold mb-4">{item.title}
            <span className="display ml-4 badge badge-secondary">NEW</span>
          </h1>
          <div className="mb-4">
            <p className="text-sm">{item.description}</p>
          </div>
          <div className="mb-4">
            <Rating rate={item.rating?.rate} count={item.rating?.count} />
          </div>
          <p className="text-3xl mb-4">${rounding}</p>
          <div>
            <button className="btn btn-accent" onClick={handleAddToCart}>장바구니에 담기</button>
            <Link to="/cart" className="btn btn-active btn-ghost ml-3">장바구니로 이동</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
