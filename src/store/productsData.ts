import { useRecoilValueLoadable } from 'recoil';
import { productsList } from '../store/products';

const useProductsData = () => {
  const productsLoadable = useRecoilValueLoadable(productsList);

  const loading = productsLoadable.state === 'loading';
  const items = productsLoadable.state === 'hasValue' ? productsLoadable.contents : [];

  return { items, loading };
};

export default useProductsData;
