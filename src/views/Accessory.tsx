import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/common/Breadcrumb";
import { MENUS } from "../constants/category";
import ItemList from "../components/products/ItemList";
import { useRecoilValueLoadable } from 'recoil';
import { IProduct, productsList } from '../store/products';
import useCommonLoading from '../components/products/ProductsCommonLoad';
import ProductsLoad from "../components/products/ProductsLoad";

/**
 * 뷰페이지에는 특별한 로직이 포함되어서는 안됩니다.
 * 컴포넌트를 불러다 렌더링하는 용도로만 사용 하세요.
 */
const Accessory = (): JSX.Element => {
  const [jeweleryItems, setJeweleryItems] = useState<IProduct[]>([]);
  const productsLoadable = useRecoilValueLoadable(productsList);
  const commonLoading = useCommonLoading(500); 

  useEffect(() => {
    if (productsLoadable.state === 'hasValue') {
      const items = productsLoadable.contents;
      const filteredItems = items.filter(item => item.category === "jewelery");
      setJeweleryItems(filteredItems);
    } else {
      setJeweleryItems([]);
    }
  }, [productsLoadable]);

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={MENUS.HOME} crumb={MENUS.ACCESSORY} />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-6">액세서리</h2>
        {commonLoading ? (
          <ProductsLoad limit={4} />
        ) : (
          <ItemList items={jeweleryItems} isScroll={false} />
        )}
      </article>
    </section>
  );
};

export default Accessory;
