import { useRecoilValueLoadable } from "recoil";
import { Link } from "react-router-dom";
import { cartState } from "../../store/cart";
import CartList from "./CartList";
import Confirm from "../common/Confirm";
import ProductsLoad from "../products/ProductsLoad";

const CartView = (): JSX.Element => {
  const cartLoadable = useRecoilValueLoadable(cartState);
  
  // 로딩 상태
  if (cartLoadable.state === 'loading') {
    return <ProductsLoad limit={10} />; 
  }

  // 에러 상태
  if (cartLoadable.state === 'hasError') {
    return <div>오류가 발생했습니다.</div>;
  }

  const cart = cartLoadable.contents;
  const hasItems = Object.keys(cart).length > 0;

  return (
    <>
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {/* 물품이 없다면? */}
        {!hasItems ? (
          <>
            <div>
              <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
              <Link to="/" className="btn btn-primary mt-12">
                담으러 가기
              </Link>
            </div>
            <div className="flex lg:justify-end justify-start items-center mt-10">
              <p className="text-2xl mr-6">총 : {`$0`}</p>
              <label htmlFor="confirm-modal" className="btn btn-primary">
                구매하기
              </label>        
            </div>
          </>
        ) : (
          <CartList items={cart} />
        )}
      </div>
      <Confirm />
    </>
  );
};

export default CartView;
