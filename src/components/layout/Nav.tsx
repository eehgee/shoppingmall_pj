import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useRecoilValueLoadable } from 'recoil';
import { cartState } from '../../store/cart';
import Search from '../common/Search';
import ProductsLoad from '../products/ProductsLoad'; // 로딩 컴포넌트

const navigation = [
  { name: '패션', to: '/fashion', current: false },
  { name: '액세서리', to: '/accessory', current: false },
  { name: '디지털', to: '/digital', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Nav = ({ toggleTheme }): JSX.Element => {
  const [searchVisible, setSearchVisible] = useState(false);
  const cartLoadable = useRecoilValueLoadable(cartState);

  // 로딩 상태 처리
  if (cartLoadable.state === 'loading') {
    return <ProductsLoad limit={10} />; // 로딩 상태일 때 보여줄 컴포넌트
  }

  // 에러 상태 처리
  if (cartLoadable.state === 'hasError') {
    return <div>오류가 발생했습니다.</div>;
  }

  // 데이터가 성공적으로 로드된 경우
  const cart = cartLoadable.contents;
  const totalItems = Object.values(cart).reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <div className="fixed z-10 w-full bg-gray-800 shadow">
      <div className="mx-auto max-w-7xl px-2 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-none lg:hidden">
            <label htmlFor="side-menu" aria-label="open sidebar" className="btn btn-square btn-ghost w-auto transition-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6">
                <path
                  stroke='currentColor'
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>

          <div className="flex flex-shrink-0 items-center ml-2">
            <h1>
              <Link to="/" className="flex items-center h-8 w-auto currentColor text-lg font-bold">
                React Shop
              </Link>
            </h1>
          </div>

          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames('currentColor hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-bold',
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
            {/* theme toggle */}
            <label className="swap swap-rotate">
              <input type="checkbox" className="theme-controller" value="synthwave" onChange={toggleTheme} />

              {/* sun icon */}
              <svg
                className="swap-off h-7 w-7 mr-3 ml-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-7 w-7 mr-3 ml-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* search input (hidden on sm) */}
            <div className="hidden sm:block">
              <Search />
            </div>

            {/* search icon (visible on sm) */}
            <div className="block sm:hidden relative">
              <button 
                onClick={() => setSearchVisible(!searchVisible)}
                className="btn btn-ghost p-3 hover:p-3 transition-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 stroke-gray-700 dark:stroke-white"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {searchVisible && (
  <div className="fixed top-16 left-0 w-full shadow-lg z-50">
                  <Search />
                </div>
              )}
            </div>

            {/* cart */}
            <Link to="/cart" tabIndex={0} className="btn btn-ghost btn-quadrangle ml-1 action:scale-90 p-3 hover:p-3 transition-none">
              <div className="indicator">
                <ShoppingBagIcon
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 currentColor"
                />
                <span className="indicator-item bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-white text-xs font-normal">{totalItems}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
