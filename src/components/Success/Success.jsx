import React from "react";

import css from "./Success.module.css";

export default function Success({ isOpen }) {
  return (
    <>
      {isOpen ? (
        <div className={css.overlay}>
          <div className={css.content}>Успішно додано</div>
        </div>
      ) : null}
    </>
  );
}
