import { Link, NavLink } from "react-router-dom";

import { useWindowWidth } from "../../hooks/useWindowWidth";

import clsx from "clsx";

import css from "./Sidebar.module.css";

import Logo from "/logo/logoLight.PNG";

import UserAvatar from "/img/user3.png";

import { MdHome } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { RiGalleryFill } from "react-icons/ri";
import { FaList } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useMenuStore } from "../../store/useMenuStore";

import { RxHamburgerMenu } from "react-icons/rx";

export default function Sidebar() {
  const width = useWindowWidth();
  const { user } = useAuth();

  const isMobile = width < 991.98;

  const { isPinned, isHover, setIsHover, togglePinned } = useMenuStore();

  const handleMouseToggle = (event) => {
    if (isHover === false && isPinned == true && event.type === "mouseenter") {
      setIsHover(true);
    } else return;
  };

  const handleMouseToggleLeave = (event) => {
    if (isHover === true && isPinned == true && event.type === "mouseleave") {
      setIsHover(false);
    } else return;
  };

  return (
    <header
      onMouseEnter={handleMouseToggle}
      onMouseLeave={handleMouseToggleLeave}
      className={`${css.sidebar} ${isHover ? css.sidebarHover : ""}`}
      style={{
        zIndex: isPinned || isHover ? "2" : "1",
        position: isPinned || isHover || isMobile ? "fixed" : "static",
        minWidth:
          !isPinned && !isMobile && width > 1391.98
            ? "15%"
            : !isPinned && !isMobile
            ? "23%"
            : "80px",
        width: !isPinned && isMobile ? "300px" : "0px  ",
      }}
    >
      <div className={css.app_brand}>
        <Link to="/dashboard/info">
          <img src={Logo} alt="Company logo" width={100} />
        </Link>
        <button
          onClick={() => togglePinned()}
          type="button"
          className={css.burger_button}
        >
          <RxHamburgerMenu />
        </button>
      </div>
      <div className={css.sidebar_profile}>
        <img src={UserAvatar} alt="Avatar" className={css.avatar} />

        <div
          className={css.profile_info}
          style={{ display: isPinned && !isHover ? "none" : "block" }}
        >
          <p>Hello 👋</p>
          <h6>Mr.{user.name}</h6>
        </div>
      </div>
      <nav className={css.sidebar_nav}>
        <ul>
          {/* Info */}
          <li>
            <NavLink
              to="/dashboard/info"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <span>
                <MdHome />
                <span
                  style={{ display: isPinned && !isHover ? "none" : "block" }}
                >
                  Dashboard
                </span>
              </span>
            </NavLink>
          </li>
          {/* Subscriber */}
          <li>
            <NavLink
              to="/dashboard/subscribers"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <span>
                <FaUsers />
                <span
                  style={{ display: isPinned && !isHover ? "none" : "block" }}
                >
                  Subscriber
                </span>
              </span>
            </NavLink>
          </li>
          {/* Messeges */}
          <li>
            <NavLink
              to="/dashboard/message"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <span>
                <AiFillMessage />
                <span
                  style={{ display: isPinned && !isHover ? "none" : "block" }}
                >
                  Messeges
                </span>
              </span>
            </NavLink>
          </li>
          {/* Portfolio */}
          <li>
            <NavLink
              to="/dashboard/portfolio"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <span>
                <RiGalleryFill />
                <span
                  style={{ display: isPinned && !isHover ? "none" : "block" }}
                >
                  Portfolio
                </span>
              </span>
            </NavLink>
          </li>
          {/* Slider */}
          <li>
            <NavLink
              to="/dashboard/slider"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <span>
                <FaImages />
                <span
                  style={{ display: isPinned && !isHover ? "none" : "block" }}
                >
                  Hero slider
                </span>
              </span>
            </NavLink>
          </li>
          {/* Post */}
          <li>
            <NavLink
              to="/dashboard/post"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <span>
                <FaList />
                <span
                  style={{ display: isPinned && !isHover ? "none" : "block" }}
                >
                  Blog
                </span>
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
