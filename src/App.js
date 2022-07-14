import "./App.css";
import Form from "./Components/Form";
import { useState, useEffect } from "react";
import List from "./Components/List";
import Modal from "./Components/Modal";
import axios from "axios";

console.log(process.env);

const sendDataToServer = async (data, url, method) => {
  const res = await axios({
    url,
    method,
    data,
  });
  const resData = res.data;
  return resData;
};

const updateDone = (data) => {
  axios({
    url: `${process.env.REACT_APP_PROXY}/todo/update`,
    method: "PUT",
    data: data,
    headers: { "Content-Type": "application/json" },
  });
};

const getAllTodo = async () => {
  const res = await axios({
    url: `${process.env.REACT_APP_PROXY}/todo/getall`,
  });
  const data = res.data;
  return data;
};

const deleteTask = async (id) => {
  await axios({
    url: `${process.env.REACT_APP_PROXY}/todo/delete`,
    method: "DELETE",
    data: id,
    headers: { "Content-Type": "text/plain" },
  });
};

const App = () => {
  const [taskInput, setTaskInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [alert, setAlert] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getAllTodo().then((data) => {
      const newData = data.map((item) => {
        return {
          id: item.todo_id,
          todo: item.todo_task,
          done: item.done,
        };
      });
      setLoader(false);
      setTodoList(newData);
    });
  }, []);

  const todoInputHandler = (e) => {
    setTaskInput(() => {
      return e.target.value;
    });
  };

  const addTodoItem = async (e) => {
    e.preventDefault();
    if (taskInput === "") {
      setAlert((state) => {
        return `You must enter a task!`;
      });
      return;
    }
    const id = await sendDataToServer(
      { todo: taskInput, done: false },
      `${process.env.REACT_APP_PROXY}/todo/upload`,
      "POST"
    );
    const todo = {
      todo: taskInput,
      done: false,
      id,
    };
    setTodoList((state) => {
      return [todo, ...state];
    });
    setAlert("");
    setTaskInput("");
  };

  const removeItem = (id) => {
    window.scrollTo(0, 0);
    setDeleteId(id);
    setShowModal(true);
  };

  const deleteItem = () => {
    const filteredTodoList = todoList.filter((todo) => todo.id !== deleteId);
    setTodoList((state) => {
      return filteredTodoList;
    });
    setShowModal(false);
    deleteTask(deleteId);
  };

  const markAsDone = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        updateDone({ id, done: todo.done });
        return todo;
      }
      return todo;
    });
    setTodoList((state) => {
      return newTodoList;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <Form
          value={taskInput}
          alert={alert}
          submitHandler={addTodoItem}
          name="taskInput"
          placeholder="Enter a task..."
          onChangeHandler={todoInputHandler}
        />
        {!loader ? (
          <List
            todoList={todoList}
            removeItem={removeItem}
            markAsDone={markAsDone}
          />
        ) : (
          <h1>LOADING...</h1>
        )}
      </header>
      {showModal ? (
        <Modal showModal={setShowModal} deleteItem={deleteItem} />
      ) : null}
    </div>
  );
};

export default App;
