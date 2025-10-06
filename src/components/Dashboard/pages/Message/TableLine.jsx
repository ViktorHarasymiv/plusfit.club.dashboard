import React from "react";
import css from "./Style.module.css";

function TableLine() {
  return (
    <div className={css.table_wrapper}>
      <div className={css.table_user_info}>
        <span>Статус</span>
        <span>Дані відправника</span>
      </div>
      <span>Повідомлення</span>
      <div className={css.table_user_info}>
        <span>Дата</span>
        <span>Усунути</span>
      </div>
    </div>
  );
}

export default TableLine;
