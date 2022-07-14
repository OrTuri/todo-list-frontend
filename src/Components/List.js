import style from "./List.module.css";
import { AiOutlineCheck, AiFillDelete } from "react-icons/ai";

const List = (props) => {
  const { todoList, removeItem, markAsDone } = props;
  return todoList.length > 0 ? (
    <div className={style.container}>
      <ul className={style.ul}>
        {todoList.map(({ todo, id, done }) => {
          return (
            <li className={style.li} key={id}>
              <span className={done ? `${style.done}` : ""}>{todo}</span>{" "}
              <span className={style["icons-container"]}>
                <AiOutlineCheck
                  className={`${style.check} ${style.icon}`}
                  onClick={() => {
                    markAsDone(id);
                  }}
                />
                <AiFillDelete
                  onClick={() => {
                    removeItem(id);
                  }}
                  className={`${style.icon} ${style.delete}`}
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
};

export default List;
