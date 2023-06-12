import css from './Commont.modules.scss';
import style from './Comment1.modules.scss';
import './Comment.scss';

export default function Comment() {
  return (
    <div>
      <ul>
        <li className={css.test}>
          You are naive.
          <span className="test">Test global</span>
        </li>
        <li className={css.test2}>You are young.</li>
        <li className={style.test3}>Just In Time.</li>
      </ul>
    </div>
  );
}
