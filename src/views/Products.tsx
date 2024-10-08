import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { productsList } from '../store/products';
import ItemDetail from '../components/products/ItemDetail';
import Error from '../views/Error';
import ProductsLoad from '../components/products/ProductsLoad';

const Products = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const productsLoadable = useRecoilValueLoadable(productsList);

  if (productsLoadable.state === 'loading') {
    return <ProductsLoad limit={10} />;
  }

  if (productsLoadable.state === 'hasError') {
    return <Error />;
  }

  const items = productsLoadable.contents;
  const item = items.find(product => product.id === Number(id));

  if (!item) {
    return <Error />;
  }

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <ItemDetail item={item} />
      </article>
    </section>
  );
};

export default Products;
