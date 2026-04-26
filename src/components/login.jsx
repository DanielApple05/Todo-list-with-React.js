import React from 'react';
import { useNavigate } from 'react-router-dom';

const login = () => {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    };

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const url = loggedIn ? "http://localhost:5000/api/auth/signup"
          : "http://localhost:5000/api/auth/Login";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
          console.log(data);
          return;
        }

        // 🔥 Save token
        localStorage.setItem("token", data.token);


        // ✅ Go to todo page
        navigate("/todo");
      } catch (err) {
        console.log("Error:", err);
      }
    }}

    return (
      <div className="flex items-center justify-center h-screen bg-[url('../images/login-background.png')] bg-cover bg-no-repeat">
        <div className='bg-white p-10 rounded-lg shadow-xl xl:w-4/12 w-10/12 max-h-2.5/4 '>
          <h2 className='text-2xl font-bold text-center'>
            {loggedIn ? "Sign Up!" : "Please Log In"}
          </h2>
          <form onSubmit={handleSubmit} className='grid gap-3 my-5' >
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-300 rounded-md p-2 w-full ' />
            {errors.email && (
              <p className="text-red-500 text-[10px]">{errors.email}</p>
            )}
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-gray-300 rounded-md p-2 w-full' />
            {errors.password && (
              <p className="text-red-500 text-[10px]">{errors.password}</p>
            )}
            <button type='submit' className='bg-purple-500 text-white py-2 px-4 rounded-md w-full cursor-pointer'>{loggedIn ? "Sign Up" : "Log In"}</button>
          </form>
          <p className='text-[12px]'>
            {loggedIn ? "Already have an account?" : "Don't have an account?"} <span className='text-blue-500 cursor-pointer' onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? "Log In" : "Sign Up"}</span>
          </p>
        </div>
      </div>
    );
  }

  export default login;
