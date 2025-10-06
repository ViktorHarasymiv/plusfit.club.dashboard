import React from "react";

import css from "./Style.module.css";

import { MdDelete } from "react-icons/md";

function NewMessage({ data, handleToggleRead, handleDeleteMessage }) {
  if (data.length === 0) return <h1>Повідомлень немає !</h1>;
  return (
    <ul className={css.wrapper_list}>
      {data.map(
        ({ _id, name, email, section, message, createdAt, isRead }, index) => {
          const date = new Date(createdAt);
          const formatted = date.toLocaleString("uk-UA", {
            timeZone: "Europe/Kyiv",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return (
            <li key={index} className={css.item}>
              <input
                type="checkbox"
                checked={isRead}
                onChange={() => handleToggleRead(_id, isRead)}
              />
              <div className={css.user}>
                <div className={css.user_info}>
                  <span>{name}</span>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                {section}
              </div>
              <div className={css.message}>{message}</div>
              <div className={css.time}>{formatted}</div>
              <MdDelete
                onClick={() => handleDeleteMessage(_id)}
                style={{ fontSize: "22px", marginLeft: "15px" }}
              />
            </li>
          );
        }
      )}
    </ul>
  );
}
export default NewMessage;
