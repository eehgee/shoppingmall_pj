import { Link } from "react-router-dom"
import { IProduct } from "../../store/products"


interface ItemProps{
  items: IProduct[]
  isScroll?: boolean;
}

const ItemList = ({items, isScroll = false}:ItemProps): JSX.Element => {

  return (
    <div className={`overflow-x-${isScroll ? "auto" : "hidden"}`}>
      <div className={`grid gap-6 
          ${isScroll
            ? "sm:grid-cols-none sm:flex md:grid md:grid-cols-2 lg:grid-cols-4"
            : "md:grid md:grid-cols-2 lg:grid-cols-4"}`}>
        {items.map((item) => (
          <div
            key={item.id}
            className={`border rounded shadow currentColor flex flex-col flex-shrink-0 md:w-auto ${isScroll ? "sm:w-80" : ""}` }
          >
            <Link to={`/products/${item.id}`} className="flex flex-col flex-grow">
                <figure className="bg-white p-10">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="h-40 mx-auto mb-4 transform transition-transform duration-200 hover:scale-110"
                    />
                </figure>
                <div className="card-body bg-white-300">
                    <h2 className="text-md font-semibold mb-2">{item.title}</h2>
                    <p className="text-md">${Math.round(item.price)}</p>
                </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList
