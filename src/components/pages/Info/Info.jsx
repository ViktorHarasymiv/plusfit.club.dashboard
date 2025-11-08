import { useCountStore } from "../../../store/countStore";
import { useMessageStore } from "../../../store/messageStore";

import css from "./Style.module.css";
import { useEffect } from "react";

import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { MdOutlineAddCard } from "react-icons/md";

function Home() {
  const { messages, fetchMessages } = useMessageStore();
  const { data, fetchSubscCount } = useCountStore();

  useEffect(() => {
    fetchMessages();
    fetchSubscCount({ isVerify: false });
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
            <MdOutlineAddCard />
            <h5>New subscriber</h5>
          </div>
          <span>{data}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
