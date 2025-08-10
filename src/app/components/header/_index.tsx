import { NavLink } from "react-router-dom";
import "./_index.scss";
import { useState } from "react";
import avt from "@/assets/images/avt.jpg";
import { menuData } from "./constant";
import type { IMenuItem } from "./model";

interface IMenuComponentProps {
  className?: string;
  onClose?: () => void;
}

const MenuComponent = ({ className, onClose }: IMenuComponentProps) => {
  return (
    <>
      <ul className={`header__menu ${className}`}>
        {menuData.map((item: IMenuItem) => (
          <li key={item.name} className="header__menu-item">
            <NavLink
              to={item.link}
              className="header__menu-link"
              onClick={() => onClose && onClose()}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="header__theme">Theme</div>
    </>
  );
};

const HeaderComponent = () => {
  const [isShowVerticalMenu, setIsShowVerticalMenu] = useState(false);
  return (
    <header>
      <div className="flex items-center justify-between h-full w-full ">
        <div className="container mx-auto max-w-screen-xl flex items-center justify-between  px-4">
          <div className="header__profile flex items-center gap-2 w-1/3">
            <div className="header__profile-avatar flex items-center justify-center border-2 border-solid border-[#ddd] w-10 h-10 rounded-full">
              <img
                src={avt}
                alt="BYL"
                className="header__profile-image w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="header__profile-info hidden sm:hidden lg:block">
              <div className="header__profile-name font-bold text-sm">
                Bui Yen Linh
              </div>
              <div className="header__profile-title text-xs">
                Software Engineer
              </div>
            </div>
          </div>

          <div className="hidden md:flex right-0 flex-column md:flex-row align-center justify-end w-full gap-16">
            <MenuComponent className="header__menu--horizontal items-center gap-12 hidden md:flex flex-column md:flex-row" />
          </div>
          <div className="header__mobile-trigger block sm:block md:hidden">
            <div
              className="header__mobile-button cursor-pointer"
              onClick={() => setIsShowVerticalMenu(true)}
            >
              ##
            </div>
          </div>
        </div>
      </div>

      {isShowVerticalMenu && (
        <div
          className="fixed top-0 left-0 w-full h-full z-40 bg-[rgb(0_0_0/_0.5)]"
          onClick={() => setIsShowVerticalMenu(false)}
        ></div>
      )}

      <div
        className={`header__mobile fixed top-0 ${
          isShowVerticalMenu ? "left-0" : "-left-52"
        } w-52 h-full bg-white z-50 border-r border-gray-200 transition-all duration-200`}
      >
        <MenuComponent
          className="header__menu--vertical flex flex-col items-start"
          onClose={() => setIsShowVerticalMenu(false)}
        />
      </div>
    </header>
  );
};

export default HeaderComponent;
