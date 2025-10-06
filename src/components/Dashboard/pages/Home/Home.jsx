import React from "react";
import { useMessageStore } from "../../../../store/messageStore";

import css from "./Style.module.css";
import { GET_MESSAGE } from "../../../../services/message";
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
          <h2>Повідомлень: {messages.length} </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
