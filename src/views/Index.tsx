import React, { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { IProduct, productsList } from '../store/products';
import Slider from '../components/common/Slider';
import ItemList from '../components/products/ItemList';
import ProductsLoad from "../components/products/ProductsLoad";
import useCommonLoading from '../components/products/ProductsCommonLoad'; 

const Index = (): JSX.Element => {
  const productsLoadable = useRecoilValueLoadable(productsList);
  const commonLoading = useCommonLoading(500); 
  const [items, setItems] = useState<IProduct[]>([]); 

  useEffect(() => {
    if (productsLoadable.state === 'hasValue') {
      setItems(productsLoadable.contents);
    }
  }, [productsLoadable]);

  return (
    <>
      <Slider />
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-6">패션</h2>
        {commonLoading ? (
          <ProductsLoad limit={4} />
        ) : (
          <ItemList items={items.slice(0, 4)} isScroll={true} />
        )}
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-6">액세서리</h2>
        {commonLoading ? (
          <ProductsLoad limit={4} />
        ) : (
          <ItemList items={items.slice(4, 8)} isScroll={true} />
        )}
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-6">디지털</h2>
        {commonLoading ? (
          <ProductsLoad limit={4} />
        ) : (
          <ItemList items={items.slice(8, 12)} isScroll={true} />
        )}
      </section>
    </>
  );
};

export default Index;
