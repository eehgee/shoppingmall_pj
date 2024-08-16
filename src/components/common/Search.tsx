import React, { useState, useEffect, useRef } from "react";
import { useRecoilValueLoadable } from "recoil";
import { IProduct, productsList } from "../../store/products";
import { Link, useNavigate } from "react-router-dom";
import CONSTANTS from "../../constants/constants";
import "../../assets/css/tailwind.css"

const Search = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const productsLoadable = useRecoilValueLoadable(productsList);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (productsLoadable.state === 'hasValue') {
      const products = productsLoadable.contents;
      setFilteredProducts(products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredProducts([]);
    }
  }, [productsLoadable, searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === CONSTANTS.KEY.ARROW_DOWN) {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredProducts.length - 1)
      );
    } else if (e.key === CONSTANTS.KEY.ARROW_UP) {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === CONSTANTS.KEY.ENTER && selectedIndex >= 0) {
      navigate(`/products/${filteredProducts[selectedIndex].id}`);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [searchQuery]);

  const handleFocus = () => {
    if (searchQuery) {
      setIsDropdownVisible(true);
    }
  };

  return (
    <div
      className="dropdown relative w-full"
      ref={dropdownRef}
    >
      <input
        type="text"
        placeholder="검색"
        className="input input-bordered rounded currentColor w-full text-currentColor"

        // input input-bordered rounded currentColor w-full text-currentColor
        // className="fixed left-0 top-4 sm:static w-full input focus:outline-0 rounded-none sm:rounded bg-gray-500 sm:transform-none transition-all translate-y-full"
        // className="input rounded-none fixed top-4 left-0 sm:static w-full sm:rounded bg-gray-700 sm:transform-none translate-y-full"

        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      {isDropdownVisible && (
        <ul
          tabIndex={0}
          className="absolute left-0 right-0 mt-2 bg-base-100 z-[1] w-full max-h-80 overflow-y-auto shadow-lg"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li
                key={product.id}
                className={`p-2 cursor-pointer hover:bg-gray-500 ${
                  index === selectedIndex ? "bg-gray-500" : ""
                }`}
              >
                <Link to={`/products/${product.id}`} className="block searchTextHidden">
                  {product.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="p-2">검색 결과가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
