const ProductsLoad = ({ limit, isScroll = false }: { limit: number, isScroll?: boolean }): JSX.Element => {
  return (
    <div className={`overflow-x-${isScroll ? "auto" : "hidden"}`}>
      <div className={`grid gap-6 
          ${isScroll
            ? "sm:grid-cols-none sm:flex md:grid md:grid-cols-2 lg:grid-cols-4"
            : "md:grid md:grid-cols-2 lg:grid-cols-4"}`}>
        {Array.from(Array(limit)).map((_, index) => (
          <div
            key={index}
            className={`border rounded shadow flex flex-col flex-shrink-0 md:w-auto ${isScroll ? "sm:w-80" : ""}`}
          >
            <div className="h-40 bg-gray-100"></div>
            <div className="p-4 space-y-4">
              <div className="h-6 bg-gray-100 rounded"></div>
              <div className="h-6 bg-gray-100 rounded w-5/6"></div>
              <div className="h-6 bg-gray-100 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsLoad;
