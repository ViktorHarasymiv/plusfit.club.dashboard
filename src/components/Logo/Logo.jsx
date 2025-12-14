import React from "react";

import css from "./Style.module.css";

function Logo({ isInView, size, color }) {
  return (
    <div
      className={css.logo}
      style={{
        fontSize:
          size === 1
            ? "14px"
            : "clamp(1.125rem, 0.7729rem + 1.5023vw, 2.125rem)",
        color: isInView ? "var(--dark)" : null,
      }}
    >
      <span
        style={{
          color: isInView ? "var(--dark)" : null || color ? "white" : null,
        }}
      >
        IRON
      </span>
      MASS
    </div>
  );
}

export default Logo;
