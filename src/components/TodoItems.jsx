import React from 'react';
import tick from '../assets/tick.svg';
import un_tick from '../assets/un_tick.svg';
import remove_icon from '../assets/remove.svg';

const TodoItems = ({text, id, isComplete, deleteTodo, toggle, }) => {  
  return (
    <div className='flex space-y-6 border-b justify-between px-4 rounded '>

      <div onClick={() => {toggle(id)}} className='flex cursor-pointer pt-4'>
        <img className='w-7 ' src={isComplete ? tick : un_tick} alt="" />
        <p className={`ml-4 text-[19px] decoration-slate-100 ${isComplete ? "text-red-500 line-through" : ""}`}>
          {text}
        </p>
      </div>

      <img src={remove_icon} alt="" className='w-4 cursor-pointer ' onClick={()=> deleteTodo(id) } />

    </div>
  );
}

export default TodoItems;
