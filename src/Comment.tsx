import React from "react";
import css from "./Commont.modules.scss";
import style from "./Comment1.modules.scss";

export default function Comment() {
  return (
    <div>
      <ul>
        <li className={css.test}>You are naive.</li>
        <li className={css.test2}>You are young.</li>
        <li className={style.test3}>Just In Time.</li>
      </ul>
    </div>
  );
}
