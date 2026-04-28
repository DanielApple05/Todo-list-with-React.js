import { useEffect, useRef, useState } from 'react';
import moonIcon from '../assets/icon-moon.svg';
import TodoItems from './TodoItems';
import sunIcon from '../assets/icon-sun.svg';
import { useNavigate } from 'react-router-dom';


const Todo = () => {
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTodoList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);


  const inputRef = useRef();
  const add = async () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;
    try {
      setIsAdding(true);
      const res = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: inputText }),
      });

      const newTodo = await res.json();

      setTodoList((prev) => [...prev, newTodo]);
      inputRef.current.value = "";
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const deleteTodo = async (_id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }
      setTodoList((prev) => prev.filter((todo) => todo._id !== _id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete todo. Please try again.");
    }
  };

  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("theme")) || false
  );

  const toggle = async (_id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to toggle todo");
      }
      const updatedTodo = await res.json();
      setTodoList((prev) =>
        prev.map((todo) =>
          todo._id === _id ? updatedTodo : todo
        )
      );
    } catch (err) {
      console.error("Toggle error:", err);
      alert("Failed to update todo. Please try again.");
    }
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

    const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  return (
    <div className={` w-full relative min-h-screen ${darkMode ? "text-white bg-black" : " bg-white "}`} >
      <section className={` sticky top-0 left-0 w-full min-w-12/12 place-content-center  bg-cover bg-no-repeat flex  h-40 z-50 xl:text-[16px] text-[14px]   
          ${darkMode
          ? "bg-[url('/images/bg-desktop-dark.jpg')]"
          : "bg-[url('/images/bg-desktop-light.jpg')]"
        }`}>
        <div className=' flex flex-col xl:min-w-5/12 min-w-full place-self-center xl:mt-10 mt-15 mb-15'>
          <div className='flex items-center xl:mt-7 mt-3 xl:mb-6 mb-15 justify-between xl:px-0 px-5'>
            <div>
              <button
                onClick={() => setIsLogout(!isLogout)}
                className=' cursor-pointer text-white xs:text-3xl text-xl font-semibold '>To-Do List</button>    
            {
              isLogout && 
              <button 
              onClick={logout}
              className='bg-red-600 text-white py-1 px-3 rounded-md ml-9 xs:text-xs text-sm cursor-pointer'
              >logout</button>
            }
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}>
              <img src={darkMode ? sunIcon : moonIcon} alt="themeMode" className='xl:w-7 w-4' />
            </div>
          </div>
          <div className={`flex items-center rounded-lg xl:mx-0 mx-5  ${darkMode ? "bg-[#1e223c]" : "bg-white"}`}>
            <input
              ref={inputRef}
              disabled={isAdding}
              disabled={isLoading}
              className=' border-0 outline-none flex-1 xl:h-12 h-10 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='create a new todo...' />

            <button
              onClick={add}
              disabled={isAdding}
              className={`border-none rounded-lg bg-[#b266ff] xl:w-32 w-20 xl:h-12 h-10 text-white xl:text-lg text-sm font-medium cursor-pointer hover:bg-blue-500 ${isAdding ? "opacity-50 cursor-not-allowed text-xs" : ""}`}>{isAdding ? "Adding todo..." : "ADD +"}</button>
          </div>
        </div>
      </section>
      <div className={`xl:w-5/12 w-full mx-auto xl:min-h-160 min-h-171 shadow-2xl ${darkMode ? "text-white bg-[#1e223c]" : "bg-white"}`}>
        {isLoading ? <p className='p-10' >Loading todos...</p> :
          filteredTodos.length === 0 ? (
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
