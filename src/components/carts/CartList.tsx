import { ICartState, cartState, addToCart, removeFromCart, ICartItems } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

interface CartListProps {
  items: ICartState;
}

const CartList = ({ items }: CartListProps): JSX.Element => {
  const [cart, setCart] = useRecoilState<ICartState>(cartState);

  const removeFromCartHandler = (id: string) => {
    setCart(removeFromCart(cart, id));
  };

  const addToCartHandler = (item: ICartItems) => {
    setCart(addToCart(cart, { id: parseInt(item.id), count: 1 }));
  };

  const itemsArray = Object.values(items);

  return (
    <div className="lg:flex lg:items-start mt-4 px-2 lg:px-0">
      <div className="container mx-auto">
        {itemsArray.map((item) => {
          const rounding = Math.round(item.price);
          return (
            <div key={item.id} className="flex flex-col lg:flex-row mb-6">
              {/* 이미지 */}
              <Link to={`/products/${item.id}`} className="w-full lg:w-1/4 bg-white rounded-2xl overflow-hidden mb-6 lg:mb-0 h-64 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain p-6"
                />
              </Link>
              {/* 상세정보 */}
              <div className="w-full lg:w-1/2 lg:pl-10 mb-8">
                <Link to={`/products/${item.id}`}><h1 className="text-xl font-bold mb-4 hover:underline">{item.title}</h1></Link>
                <p className="text-3xl mb-4">{toCurrencyFormat(item.price * item.count)} 
                  <span className="text-2xl">({toCurrencyFormat(rounding)})</span>
                </p>
                <div className="flex">
                  <button className="btn btn-primary rounded-tr-none rounded-br-none" onClick={() => removeFromCartHandler(item.id)}>-</button>
                  <button className="join-item flex justify-center items-center w-12 hover:bg-gray-500 opacity-50">{`${item.count}`}</button>
                  <button className="btn btn-primary rounded-tl-none rounded-bl-none" onClick={() => addToCartHandler(item)}>+</button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex shrink-0 justify-start items-center lg:justify-end">
          {/* total */}
          <p className="text-2xl mr-6">
            총 : {toCurrencyFormat(itemsArray.reduce((total, item) => total + Math.round(item.price * item.count), 0))}
          </p>
          <label htmlFor="confirm-modal" className="btn btn-primary">
            구매하기
          </label>
        </div>
      </div>
    </div>
  );
};

export default CartList;
