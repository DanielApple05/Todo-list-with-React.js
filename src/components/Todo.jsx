import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.svg';
import TodoItems from './TodoItems.jsx';
import moonIcon from '../assets/icon-moon.svg';
import sunIcon from '../assets/icon-sun.svg'


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

  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("theme")) || false
  );

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

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={`p-4 grid min-h-screen bg-no-repeat
            ${darkMode
        ? "bg-[#1c2033] bg-[url('/images/bg-desktop-dark.jpg')]"
        : "bg-white bg-[url('/images/bg-desktop-light.jpg')]"
      }  ${darkMode ? "text-white" : "text-black"}`}>
      <div className='flex items-center mt-7 gap-2 place-self-center w-[40%] mb-6 rounded-xl justify-between'>
        <h1 className=' text-white text-3xl font-semibold'>To-Do List</h1>
        <div
          className="cursor-pointer"
          onClick={() => setDarkMode(prev => !prev)}
        >
          <img src={darkMode ? sunIcon : moonIcon} alt="themeMode" />
        </div>

      </div>
      <div className=' place-self-center w-[40%] flex flex-col  min-h-[550px] rounded-xl'>
        <div className={`flex items-center mb-10 rounded-lg  ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
          <input ref={inputRef} className=' border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='create a new todo...' />

          <button onClick={add} className='border-none rounded-lg bg-[#b266ff] w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-blue-500'>ADD +</button>
        </div>
        <div className={`flex flex-col  shadow-2xl   ${darkMode ? "bg-[#1e223c]" : "bg-white"} h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-200 `}>
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

        <div className={`flex justify-between p-4 shadow-xl border-t  ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
          <div>
            <p>
              {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
            </p>
          </div>
          <div className="flex space-x-6">
            <p
              onClick={() => setFilter("all")}
              className={`cursor-pointer transition-colors ${filter === "all"
                ? "font-bold text-blue-500"
                : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
                }`}
            >
              All
            </p>
            <p
              onClick={() => setFilter("active")}
              className={`cursor-pointer transition-colors ${filter === "active"
                ? "font-bold text-blue-500"
                : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
                }`}
            >
              Active
            </p>

            <p
              onClick={() => setFilter("completed")}
              className={`cursor-pointer transition-colors ${filter === "completed"
                ? "font-bold text-blue-500"
                : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
                }`}
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
