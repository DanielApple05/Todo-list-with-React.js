import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.svg';
import TodoItems from './TodoItems.jsx';
import moonIcon from '../assets/icon-moon.svg';
import sunIcon from '../assets/icon-sun.svg'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Todo = () => {

  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const inputRef = useRef();
  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }
    setTodoList((prev) => [...prev, newTodo])
    inputRef.current.value = "";
  }
  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id)
    }
    )
  }

  const [darkMode, setDarkMode] = useState(false);

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete }
        }
        return todo;
      })
    })
  }



  const [filter, setFilter] = useState("all");

  const itemsLeft = todoList.filter(todo => !todo.isComplete).length;

  const filteredTodos = todoList.filter(todo => {
    if (filter === "completed") return todo.isComplete;
    if (filter === "All") return todo
    if (filter === "active") return !todo.isComplete;
    return true;
  });

  const clearCompleted = () => {
    setTodoList(todoList.filter(todo => !todo.isComplete));
  };


  useEffect(() => { localStorage.setItem("todos", JSON.stringify(todoList)) }, [todoList])

  return (
    <div className={`p-4 grid min-h-screen bg-no-repeat
            ${darkMode
        ? "bg-stone-900 bg-[url('/images/bg-desktop-dark.jpg')]"
        : "bg-white bg-[url('/images/bg-desktop-light.jpg')]"
      }`}>
      <div className='flex items-center mt-7 gap-2 place-self-center w-[40%] mb-8  rounded-xl justify-between'>
        <h1 className=' text-white text-3xl font-semibold'>To-Do List</h1>
        <div
          className="cursor-pointer"
          onClick={() => setDarkMode(prev => !prev)}
        >
          <img src={darkMode ? moonIcon : sunIcon} alt="themeMode" />
        </div>

      </div>
      <div className=' place-self-center w-[40%] flex flex-col  min-h-[550px] rounded-xl'>
        <div className='flex items-center mb-10 bg-gray-200 rounded-lg'>
          <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder=' create a new todo...' />

          <button onClick={add} className='border-none rounded-lg bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>
        <div className='bg-white flex  flex-col flex-1 shadow-2xl'>
          {filteredTodos.map((item, index) => (
            <TodoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          ))}
        </div>

        <div className='flex justify-between bg-white p-4 shadow-xl'>
          <div>
            <p>
              {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
            </p>
          </div>
        <div className="flex space-x-6">
  <p
    onClick={() => setFilter("all")}
    className={`cursor-pointer ${filter === "all" ? "font-bold text-blue-600" : "text-gray-500"}`}
  >
    All
  </p>
  <p
    onClick={() => setFilter("active")}
    className={`cursor-pointer ${filter === "active" ? "font-bold text-blue-600" : "text-gray-500"}`}
  >
    Active
  </p>
  <p
    onClick={() => setFilter("completed")}
    className={`cursor-pointer ${filter === "completed" ? "font-bold text-blue-600" : "text-gray-500"}`}
  >
    Completed
  </p>
</div>

          <div>
            <p
              onClick={clearCompleted}
              className="cursor-pointer text-red-500 hover:underline"
            >
              Clear Completed
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Todo;
