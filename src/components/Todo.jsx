import { useEffect, useRef, useState } from 'react';
import moonIcon from '../assets/icon-moon.svg';
import TodoItems from './TodoItems'
import sunIcon from '../assets/icon-sun.svg'


const Todo = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => setTodoList(data))
      .catch(err => console.error(err));
  }, []);

  const inputRef = useRef();
  const add = async () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    });

    const newTodo = await res.json();

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = async (_id) => {
    await fetch(`${API_URL}/todos/${_id}`, {
      method: "DELETE",
    });
    setTodoList((prev) => prev.filter((todo) => todo._id !== _id));
  };

  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("theme")) || false
  );

  const toggle = async (id) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PATCH",
    });
    const updatedTodo = await res.json();
    setTodoList((prev) =>
      prev.map((todo) =>
        todo._id === id ? updatedTodo : todo
      )
    );
  };

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

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={` w-full relative min-h-screen ${darkMode ? "text-white bg-black" : " bg-white "}`} >
      <section className={` sticky top-0 left-0 w-full min-w-12/12 place-content-center  bg-cover bg-no-repeat flex  h-40 z-50 xl:text-[16px] text-[14px]   
          ${darkMode
          ? "bg-[url('/images/bg-desktop-dark.jpg')]"
          : "bg-[url('/images/bg-desktop-light.jpg')]"
        }`}>
        <div className=' flex flex-col xl:min-w-5/12 min-w-full place-self-center xl:mt-10 mt-15 mb-15'>
          <div className='flex items-center xl:mt-7 mt-3 xl:mb-6 mb-15 justify-between xl:px-0 px-5'>
            <h1 className=' text-white xs:text-3xl text-xl font-semibold '>To-Do List</h1>
            <div
              className="cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}>
              <img src={darkMode ? sunIcon : moonIcon} alt="themeMode" className='xl:w-7 w-4' />
            </div>
          </div>
          <div className={`flex items-center rounded-lg xl:mx-0 mx-5  ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
            <input ref={inputRef} className=' border-0 outline-none flex-1 xl:h-12 h-10 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='create a new todo...' />

            <button onClick={add} className='border-none rounded-lg bg-[#b266ff] xl:w-32 w-20 xl:h-12 h-10 text-white xl:text-lg text-sm font-medium cursor-pointer hover:bg-blue-500'>ADD +</button>
          </div>
        </div>
      </section>
      <div className={`xl:w-5/12 w-full mx-auto xl:min-h-160 min-h-171 shadow-2xl ${darkMode ? "text-white bg-[#1e223c]" : "bg-white"}`}>
        {filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <p className="text-lg font-semibold">No todos yet</p>
            <p className="text-sm">Add a task to get started...</p>
          </div>
        ) :
          (filteredTodos.map((item) => (
            <TodoItems
              key={item._id}
              text={item.text}
              isComplete={item.isComplete}
              createdAt={item.createdAt}
              deleteTodo={deleteTodo}
              toggle={toggle}
              id={item._id}
            />
          )))}
      </div>
      <div className={` xl:w-5/12 w-full flex justify-between p-2 shadow-xl border-t z-50 sticky place-self-center bottom-0 xl:text-[14px] text-[10px] 
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
  );
}

export default Todo;
