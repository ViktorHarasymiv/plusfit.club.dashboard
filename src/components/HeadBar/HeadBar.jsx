import React from "react";

import css from "./Style.module.css";

import { RxHamburgerMenu } from "react-icons/rx";
import { useMenuStore } from "../../store/useMenuStore";

function HeadBar() {
  const { togglePinned } = useMenuStore();

  return (
    <div className={css.wrapper}>
      <button
        onClick={() => togglePinned()}
        type="button"
        className={css.burger_button}
      >
        <RxHamburgerMenu />
      </button>
    </div>
  );
}

export default HeadBar;
