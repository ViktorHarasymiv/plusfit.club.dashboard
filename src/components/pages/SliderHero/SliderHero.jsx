import React, { useState } from "react";
import clsx from "clsx";

import css from "./Style.module.css";

import { ClipLoader } from "react-spinners";
import AllSlide from "./AllSlide";
import NewSlide from "./NewSlide";

function SliderHero() {
  const [isLoading] = useState(false);
  const [tab, setTab] = useState("1");

  const tabsArray = [
    { id: "1", label: "Усі" },
    {
      id: "2",
      label: "Додати слайд",
    },
  ];

  return (
    <div className="subb_route_wrapp">
      <div className="buttons_wrapp">
        {tabsArray.map((item, i) => {
          return (
            <button
              key={i}
              onClick={() => setTab(item.id)}
              className={clsx("tabs_button", tab === item.id && "activeTab")}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {isLoading ? (
        <ClipLoader color="#ffffff" />
      ) : tab === "1" ? (
        <AllSlide />
      ) : tab === "2" ? (
        <NewSlide />
      ) : null}
    </div>
  );
}

export default SliderHero;
