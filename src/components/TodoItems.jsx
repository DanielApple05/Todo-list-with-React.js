import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, }) => {
  return (
    <div className='flex xl:space-y-4 space-y-2 border-b justify-between px-4 rounded items-center  xl:text-[16px] text-[14px] '>
      <div className='flex items-center pt-4 '>
        <FontAwesomeIcon icon={isComplete ? faCircleCheck : faCircleRegular} 
        onClick={() => { toggle(id) }} 
        className={`cursor-pointer hover:text-[#b266ff] transition-colors ${isComplete ? "text-[#b266ff]" : "text-gray-400"}`} />

        <p className={`xl:ml-4 ml-2 decoration-slate-100 ${isComplete ? "text-red-500 line-through" : ""}`}>
          {text}
        </p>
      </div>

      <FontAwesomeIcon icon={faTrash} className=' cursor-pointer text-purple-500 transition-colors hover:text-red-500' onClick={() => deleteTodo(id)} />

    </div>
  );
}

export default TodoItems;