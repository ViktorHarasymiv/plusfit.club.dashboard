import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./PageBar.module.css";

import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";

function PageBar() {
  const location = useLocation();

  const segment = location.pathname.split("/");

  return (
    <div className={css.history_bar}>
      <div className="container">
        <ul className={css.history_list}>
          <li className={css.history_item}>
            <IoHomeOutline /> <Link to="/dashboard/info">Home</Link>
          </li>
          <li className={css.history_item}>
            <Link to={location.pathname} className={css.history_link}>
              <div className={css.history_link_list}>
                {segment.map((item, index) => (
                  <React.Fragment key={index}>
                    {item}
                    {index < segment.length - 1 && (
                      <SlArrowRight className={css.arrow_svg} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PageBar;
