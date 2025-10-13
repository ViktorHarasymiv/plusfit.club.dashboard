import React, { useState } from "react";

// import css from "./Style.module.css";

import clsx from "clsx";
import NewPhoto from "./NewPhoto";

import { ClipLoader } from "react-spinners";
import AllPhoto from "./AllPhoto";

function Portfolio() {
  const [isLoading] = useState(false);
  const [tab, setTab] = useState("1");

  const tabsArray = [
    { id: "1", label: "Усі" },
    {
      id: "2",
      label: "Додати зоображення",
    },
  ];

  return (
    <div className="subb_route_wrapp">
      <h1 className="">Портфоліо</h1>
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
        <AllPhoto />
      ) : tab === "2" ? (
        <NewPhoto />
      ) : null}
    </div>
  );
}

export default Portfolio;
