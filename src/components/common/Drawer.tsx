import { Link } from "react-router-dom";
import "../../assets/css/tailwind.css"

const Drawer = (): JSX.Element => {

  const closeSide = ()=>{
    const checkbox = document.getElementById('side-menu') as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }

  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-gray-800 dark:bg-base-100">
        {/* 모바일 메뉴를 노출시켜 보세요. */}
        <li><Link to="/fashion" className="currentColor hover:currentColor active:currentColor" onClick={closeSide}>패션</Link></li>
        <li><Link to="/accessory" className="currentColor hover:currentColor active:currentColor" onClick={closeSide}>액세서리</Link></li>
        <li><Link to="/digital" className="currentColor hover:currentColor active:currentColor" onClick={closeSide}>디지털</Link></li>
      </ul>
    </div>
  );
};

export default Drawer;
