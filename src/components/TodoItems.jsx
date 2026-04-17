import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, createdAt }) => {

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

  return (
    <div className='flex border-b justify-between xl:p-4 p-2 rounded items-center  xl:text-[16px] text-[14px] '>
      <div className='flex items-center'>
        <FontAwesomeIcon icon={isComplete ? faCircleCheck : faCircleRegular}
          onClick={() =>  toggle(id) }
          className={`cursor-pointer hover:text-[#b266ff] transition-colors ${isComplete ? "text-[#b266ff]" : "text-gray-400"}`} />

      <div className='grid xl:ml-4 ml-2 gap-1'>
          <p className={`decoration-slate-100 ${isComplete ? "text-red-500 line-through" : ""}`}>
          {text}
        </p>
        <p className='text-[8px]'>{formatDate(createdAt)}</p>
      </div>
      </div>
      <FontAwesomeIcon icon={faTrash} className=' cursor-pointer text-purple-500 transition-colors hover:text-red-500' onClick={() => deleteTodo(id)} />
    </div>
  );
}

export default TodoItems;