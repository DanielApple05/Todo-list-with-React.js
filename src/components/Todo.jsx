import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.svg';
import TodoItems from './TodoItems.jsx';
import moonIcon from '../../public/images/icon-moon.svg';
import sunIcon from '../../public/images/icon-moon.svg'
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

  const { darkMode, lightMode} = useState (darkMode)

  useEffect(() => { localStorage.setItem("todos", JSON.stringify(todoList)) }, [todoList])

  return (
    <div>
      <div className='flex items-center mt-7 gap-2 place-self-center w-[40%] mb-8  rounded-xl justify-between'>
        <h1 className=' text-white text-3xl font-semibold'>To-Do List</h1>
        <div className='cursor-pointer' onClick={ darkMode ? moonIcon : sunIcon }>
          <img src={moonIcon} alt="" />
        </div>
      </div>
      <div className=' place-self-center w-[40%] flex flex-col  min-h-[550px] rounded-xl'>
        <div className='flex items-center mb-7 bg-gray-200 rounded-lg'>
          <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder=' create a new todo...' />

          <button onClick={add} className='border-none rounded-lg bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>      
          <div className='bg-white flex  flex-col flex-1'>
            {todoList.map((item, index) => (
              <TodoItems
                key={item.id + index}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            ))}
          </div>

          <div className='flex justify-between bg-white p-2'>
            <div>
              <p>
                5 items left
              </p>
            </div>
            <div className='flex space-x-6'>
              <p>All</p>
              <p>Active</p>
              <p>Completed</p>
            </div>
            <div>
              <p>
                Clear Completed
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Todo;
