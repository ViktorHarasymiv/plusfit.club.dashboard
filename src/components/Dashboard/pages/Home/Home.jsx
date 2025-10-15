import { Link } from "react-router-dom";
import { useMessageStore } from "../../../../store/messageStore";

import css from "./Style.module.css";
import { useEffect } from "react";

function Home() {
  const { messages, fetchMessages } = useMessageStore();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className={css.wrapper}>
      <div className={css.message_wrapper}>
        <div className={css.tile}>
          <div className={css.tile_wrapper}>
            <Link to="/dashboard/message">Пошта ({messages.length})</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
