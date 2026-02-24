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
    <div className={` min-h-screen bg-no-repeat w-12/12 flex place-content-center 
            ${darkMode
        ? "bg-[#1c2033] bg-[url('/images/bg-desktop-dark.jpg')]"
        : "bg-white bg-[url('/images/bg-desktop-light.jpg')]"
      }  ${darkMode ? "text-white" : "text-black"}`}>
      <div className='  xl:w-4/12 w-full justify-center place-self-center mt-4  xl:block px-5'>
        <div className='flex items-center xl:mt-7 mt-3 xl:mb-6 mb-15 justify-between '>
          <h1 className=' text-white xl:text-3xl text-xl font-semibold'>To-Do List</h1>
          <div
            className="cursor-pointer"
            onClick={() => setDarkMode(prev => !prev)}
          >
            <img src={darkMode ? sunIcon : moonIcon} alt="themeMode" className='xl:w-7 w-4'/>
          </div>

        </div>
        <div className=' place-self-center flex flex-col w-full rounded-xl'>
          <div className={`flex items-center mb-10 rounded-lg  ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
            <input ref={inputRef} className=' border-0 outline-none flex-1 xl:h-14 h-10 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='create a new todo...' />

            <button onClick={add} className='border-none rounded-lg bg-[#b266ff] xl:w-32 w-20 xl:h-14 h-10 text-white text-lg font-medium cursor-pointer hover:bg-blue-500'>ADD +</button>
          </div>
          <div className={`flex flex-col  shadow-2xl   ${darkMode ? "bg-[#1e223c]" : "bg-white"} h-130 w-full `}>
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

          <div className={`flex justify-between p-4 shadow-xl border-t xl:text-[16px] text-[10px]  ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
            <div>
              <p>
                {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
              </p>
            </div>
            <div className="flex xl:space-x-6 space-x-2">
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
    </div>
  );
}

export default Todo;
