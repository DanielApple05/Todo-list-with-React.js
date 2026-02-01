import React from 'react';
import tick from '../assets/tick.svg'
import un_tick from '../assets/un_tick.svg'
import remove_icon from '../assets/remove.svg'

const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {  
  return (
    <div className='flex items-center my-3 gap-2'>

      <div onClick={() => {toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
        <img className='w-7 ' src={tick} alt="" />
        <p className='text-slate-700 ml-4 text-[19px]'>
          {text}
        </p>
      </div>

      <img src={remove_icon} alt="" className='w-3.5 cursor-pointer ' onClick={()=> deleteTodo(id) } />

    </div>
  );
}

export default TodoItems;
