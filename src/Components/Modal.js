import style from "./Modal.module.css";

const Modal = (props) => {
  const { showModal, deleteItem } = props;
  return (
    <div
      className={style.overlay}
      onClick={() => {
        showModal(false);
      }}
    >
      <div
        className={style.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>ARE YOU SURE?</h1>
        <div>
          <button className={style["btn-yes"]} onClick={deleteItem}>
            YES
          </button>
          <button
            className={style["btn-no"]}
            onClick={() => {
              showModal(false);
            }}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
