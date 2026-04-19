import React, { useState } from "react";
import Todo from "./components/Todo";
import '../src/App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";


const App = () => {
  return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
  );
};

export default App;


