import React, { useEffect, useRef, useState } from 'react';
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
    if (filter === "all") return todo;
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
    <div className={`${darkMode ? "text-white bg-black" : " bg-white text-black"}`} >
      <section className={`fixed top-0 left-0 w-full min-w-12/12    place-content-center xl:h-70 h-40 bg-cover bg-no-repeat flex z-50
          ${darkMode
            ? "bg-[url('/images/bg-desktop-dark.jpg')]"
            : "bg-[url('/images/bg-desktop-light.jpg')]"
          }`}>
        <div className=' flex flex-col xl:max-w-5/12 w-full place-self-center xl:mt-10 mt-15'>
          <div className='flex items-center xl:mt-7 mt-3 xl:mb-6 mb-15 justify-between xl:px-0 px-5'>
            <h1 className=' text-white xl:text-3xl text-xl font-semibold '>To-Do List</h1>
            <div
              className="cursor-pointer"
              onClick={() => setDarkMode(prev => !prev)}>
              <img src={darkMode ? sunIcon : moonIcon} alt="themeMode" className='xl:w-7 w-4' />
            </div>
          </div>
          <div className={`flex items-center xl:mb-10 mb-15 rounded-lg xl:mx-0 mx-5  ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
            <input ref={inputRef} className=' border-0 outline-none flex-1 xl:h-14 h-10 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='create a new todo...' />

            <button onClick={add} className='border-none rounded-lg bg-[#b266ff] xl:w-32 w-20 xl:h-14 h-10 text-white xl:text-lg text-sm font-medium cursor-pointer hover:bg-blue-500'>ADD +</button>
          </div>
        </div>
      </section>
      <div className=' xl:max-w-5/12 w-full place-self-center grid'>
        <div className={`flex flex-col shadow-2xl w-full xl:mt-70 mt-40 mb-20  ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
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
        <div className={`flex justify-between p-4 shadow-xl border-t z-50 fixed w-full left-0 right-0 bottom-0 xl:text-[16px] text-[10px] 
            ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
          <div>
            <p>
              {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
            </p>
          </div>
          <div className="flex xl:space-x-6 space-x-2 ">
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
