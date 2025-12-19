import { useState } from "react";

// import css from "./Style.module.css";

import clsx from "clsx";
import base from "../../../styles/Base.module.css";

import { ClipLoader } from "react-spinners";
import AllPosts from "./AllPosts";
import AddPost from "./AddPost";

function Post() {
  const [isLoading] = useState(false);
  const [tab, setTab] = useState("1");

  const tabsArray = [
    { id: "1", label: "All" },
    {
      id: "2",
      label: "Create",
    },
  ];
  return (
    <section className="section">
      <div className={base.action_wrapper}>
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
      </div>
      <div className={base.wrapper}>
        {isLoading ? (
          <ClipLoader color="#ffffff" />
        ) : tab === "1" ? (
          <AllPosts />
        ) : tab === "2" ? (
          <AddPost />
        ) : null}
      </div>
    </section>
  );
}

export default Post;
