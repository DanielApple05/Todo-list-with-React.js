import React from 'react';

const login = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <div className="flex items-center justify-center h-screen bg-[url('../images/login-background.png')] bg-cover bg-no-repeat">
      <div className='bg-white p-10 rounded-lg shadow-xl xl:w-5/12 w-10/12 xl:h-2.5/4 '>
        <h2 className='text-2xl font-bold text-center'>
          {loggedIn ? "Welcome Back!" : "Please Log In"}
        </h2>
        <form className='grid gap-3 my-5 '>
          <input type="text" placeholder='Username' className='border border-gray-300 rounded-md p-2 w-full mb-4' />
          <input type="password" placeholder='Password' className='border border-gray-300 rounded-md p-2 w-full mb-4' />
          <button onClick={() => setLoggedIn(true)} className='bg-purple-500 text-white py-2 px-4 rounded-md w-full cursor-pointer'>Log In</button>
        </form>
        <p>
          Don't have an account? <span className='text-blue-500 cursor-pointer'>Sign Up</span>
        </p>
      </div>

    </div>
  );
}

export default login;
