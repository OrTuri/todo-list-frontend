import style from "./Form.module.css";

const Form = (props) => {
  const { name, value, submitHandler, placeholder, onChangeHandler, alert } =
    props;
  return (
    <div className={style.container}>
      <form onSubmit={submitHandler} className={style.form}>
        <input
          maxLength="20"
          className={style.input}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
        <button className={style.btn}>ADD TASK</button>
      </form>
      {alert ? <p className={style.alert}>{alert}</p> : null}
    </div>
  );
};

export default Form;
