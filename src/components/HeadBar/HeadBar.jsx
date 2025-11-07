import React from "react";

import css from "./Style.module.css";

import { RxHamburgerMenu } from "react-icons/rx";
import { useMenuStore } from "../../store/useMenuStore";
import { useAuth } from "../../context/AuthContext";

import { HiOutlineUserCircle } from "react-icons/hi2";
import { AiOutlineLogout } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

function HeadBar() {
  const { user, getLogout } = useAuth();
  const { togglePinned } = useMenuStore();

  const nameParts = user?.name.split(" ") || "ADMIN";

  const logOut = () => {
    const shouldLogOut = confirm("Will you logout?");
    if (shouldLogOut) {
      getLogout();
    } else return;
  };

  return (
    <div className={css.wrapper}>
      <button
        onClick={() => togglePinned()}
        type="button"
        className={css.burger_button}
      >
        <RxHamburgerMenu />
      </button>

      <div className={css.user_action}>
        <h5 className={css.user_part}>
          {nameParts[0][0]}
          {nameParts[1][0]}
        </h5>
        <div className={css.overflow}>
          <div className={css.action_tile}>
            <ul className={css.action_wrapper}>
              <li className={css.action_item}>
                <HiOutlineUserCircle className={css.icon} />
                <span>Profile</span>
              </li>
              <li className={css.action_item}>
                <IoSettingsOutline className={css.icon} /> <span>Setup</span>
              </li>
              <li onClick={logOut} className={css.action_item}>
                <AiOutlineLogout className={css.icon} /> <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadBar;
