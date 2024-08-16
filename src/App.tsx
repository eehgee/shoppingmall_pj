import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Nav from "./components/layout/Nav";
import { useState, useEffect } from 'react';
import CONSTANTS from './constants/constants';
import Footer from "./components/layout/Footer";

const App = (): JSX.Element => {
  const [theme, setTheme] = useState(CONSTANTS.THEME.DARK);

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === CONSTANTS.THEME.DARK ? CONSTANTS.THEME.LIGHT : CONSTANTS.THEME.DARK
    );
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === CONSTANTS.THEME.DARK) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [theme]);


  return (
    <BrowserRouter>
        <input type="checkbox" id="side-menu" className="drawer-toggle" />
        <section className="drawer-content">
          {/* Nav를 렌더링 하세요 */}
          <Nav toggleTheme={toggleTheme} />
          <section className="main pt-16">
            <Router />
          </section>
          {/* Footer를 렌더링 하세요 */}
          <Footer />
        </section>
        <Drawer />
    </BrowserRouter>
  );
};

export default App;
