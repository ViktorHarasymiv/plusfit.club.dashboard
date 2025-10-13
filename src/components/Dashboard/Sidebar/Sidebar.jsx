import { Link, NavLink } from "react-router-dom";

import clsx from "clsx";

import css from "./Sidebar.module.css";

import Logo from "../../../../public/logo/logoDark.png";

import { MdHome } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
// import { FaPeopleGroup } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { RiGalleryFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../../../hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className={css.sidebar}>
      <img src={Logo} alt="" width={100} height={40} />
      <nav className={css.sidebar_nav}>
        <ul>
          <li>
            <NavLink to="/dashboard" className={css.nav_item}>
              <MdHome /> Головна
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
              <FaUsers /> Абонементи
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
              <AiFillMessage />
              Повідомлення
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
              <RiGalleryFill />
              Портфоліо
            </NavLink>
          </li>
          {/* Trainers */}
          {/* <li>
            <NavLink
              to="/dashboard/trainers"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <FaPeopleGroup />
              Trainers
            </NavLink>
          </li> */}
          {/* Slider */}
          {/* <li>
            <NavLink
              to="/dashboard/slider"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <FaPeopleGroup />
              Slider
            </NavLink>
          </li> */}
          {/* Product */}
          {/* <li>
            <NavLink
              to="/dashboard/products"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <FaPeopleGroup />
              Products
            </NavLink>
          </li> */}
          {/* News */}
          {/* <li>
            <NavLink
              to="/dashboard/news"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <FaPeopleGroup />
              News
            </NavLink>
          </li> */}
          {/* Reviews */}
          {/* <li>
            <NavLink
              to="/dashboard/reviews"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <FaPeopleGroup />
              Відгуки
            </NavLink>
          </li> */}
          {/* New subscriber */}
          {/* <li>
            <NavLink
              to="/dashboard/request"
              className={({ isActive }) =>
                clsx(css.nav_item, isActive && css.active)
              }
            >
              <FaPeopleGroup />
              New subscriber
            </NavLink>
          </li> */}
        </ul>
        {/* LOGOUT */}
        <div className={css.logout}>
          <button onClick={logout} className={css.logout_btn}>
            Log Out
            <LuLogOut />
          </button>
        </div>
      </nav>
    </div>
  );
}
