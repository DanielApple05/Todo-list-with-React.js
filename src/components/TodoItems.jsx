import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, }) => {
  return (
    <div className='flex space-y-6 border-b justify-between px-4 rounded items-center '>

      <div className='flex cursor-pointer items-center pt-4'>

        <FontAwesomeIcon icon={isComplete ? faCircleCheck : faCircleRegular} className={`text-[20px] hover:text-purple-500 transition-colors ${isComplete ? "text-purple-500" : "text-gray-400"}`} onClick={() => { toggle(id) }} />

        <p className={`ml-4 text-[19px] decoration-slate-100 ${isComplete ? "text-red-500 line-through" : ""}`}>
          {text}
        </p>
      </div>

      <FontAwesomeIcon icon={faTrash} className='w-4 cursor-pointer text-purple-500 transition-colors hover:text-red-500' onClick={() => deleteTodo(id)} />

    </div>
  );
}

export default TodoItems;