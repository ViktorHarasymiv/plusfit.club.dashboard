import { Link } from "react-router-dom";
import { useMessageStore } from "../../../store/messageStore";

import css from "./Style.module.css";
import { useEffect } from "react";

import { TbBrandGoogleAnalytics } from "react-icons/tb";

function Home() {
  const { messages, fetchMessages } = useMessageStore();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className={css.wrapper}>
      <div className={css.tile}>
        <div className={css.tile_wrapper}>
          <div className={css.tile_title_wrapper}>
            <TbBrandGoogleAnalytics />
            <h5>Messages</h5>
          </div>
          <span>{messages.length}</span>
        </div>
      </div>
      <div className={css.tile}>
        <div className={css.tile_wrapper}>
          <div className={css.tile_title_wrapper}>
            <TbBrandGoogleAnalytics />
            <h5>Messages</h5>
          </div>
          <span>{messages.length}</span>
        </div>
      </div>
      <div className={css.tile}>
        <div className={css.tile_wrapper}>
          <div className={css.tile_title_wrapper}>
            <TbBrandGoogleAnalytics />
            <h5>Messages</h5>
          </div>
          <span>{messages.length}</span>
        </div>
      </div>
      <div className={css.tile}>
        <div className={css.tile_wrapper}>
          <div className={css.tile_title_wrapper}>
            <TbBrandGoogleAnalytics />
            <h5>Messages</h5>
          </div>
          <span>{messages.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
