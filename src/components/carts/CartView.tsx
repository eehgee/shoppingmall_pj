import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { cartState } from "../../store/cart";
import BreadCrumb from "../common/Breadcrumb";
import CartList from "./CartList";
import Confirm from "../common/Confirm";

const CartView = (): JSX.Element => {
  const cart = useRecoilValue(cartState);
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
            <>
              <CartList items={cart} />
            </>
        )}
      </div>
      <Confirm />
    </>
  );
};

export default CartView;
