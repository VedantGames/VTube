import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import { User } from '../Contexts/User.Context';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
  const {user, setUser} = useContext(User); 
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const errorToast = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  });

  function login(ev) {
    ev.preventDefault();
    const loginData = {
      emailOrUsername,
      password
    }

    axios.post('/users/login', loginData).then(({data}) => {
      setUser(data.data);
      setRedirect(true);
    }).catch(err => {
      const message = err.response.data.message;
      
      errorToast(message);
    });
  }

  if (user || redirect) return <Navigate to={"/"} />

  return (
    <div className='md:grid block relative h-svh w-full bg-primary' style={{gridTemplateColumns: '1.3fr 2fr'}}>
      <div className='flex flex-col justify-center md:items-center z-50 h-full w-full sm:px-16 px-10 py-8 bg-slate-900'>
        <div className='mb-6 -mt-20 md:w-full z-50'>
          <h1 className='lg:text-5xl md:text-4xl text-4xl text-white font-sans font-semibold mb-2.5'>Welcome back</h1>
          <h1 className='text-xs text-slate-400 font-sans ml-2'>Dont have an account? <Link to={'/register'} className='text-red-500'>Register</Link></h1>
        </div>
        <div className='flex flex-col gap-2 2xl:-ml-16 ml-0 z-50 xl:w-[30rem] md:w-[20rem] w-full' style={{width: ''}}>
          <input 
            type="text" 
            placeholder='username or email'
            value={emailOrUsername}
            onChange={ev => setEmailOrUsername(ev.target.value)}
            className='rounded-md w-full px-3 py-2.5 bg-slate-800 focus-visible:outline-none focus-visible:outline-slate-800' 
          />
          <div className='relative flex items-center h-10 rounded-md w-full bg-slate-800 focus-visible:outline-none focus-visible:outline-slate-800'>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder='password'
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              className='absolute top-0 rounded-md w-full px-3 py-2.5 bg-slate-800 focus-visible:outline-none focus-visible:outline-slate-800' 
            />
            <div className='z-10 absolute right-2' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>              
              )}
            </div>
          </div>
          <div className='flex justify-center gap-2 mt-4 font-semibold'>
            <Link to={'/'} className='flex justify-center bg-slate-800 py-2 w-full rounded-full hover:w-[120%] transition-all ease-in'>Cancel</Link>
            <button className='bg-red-600 py-2 w-full rounded-full hover:w-[120%] transition-all ease-in' onClick={login}>Log In</button>
          </div>
        </div>
        <ToastContainer />
      </div>
      <div className='z-10 relative hidden md:block'>
        <div className='h-full w-full'  style={{backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 1), rgba(0,0,0,0))'}}></div>
        <div className='h-full w-full absolute top-0 left-0 bg-slate-900 opacity-0'  style={{}}></div>
      </div>
      <img src="https://i.pinimg.com/564x/98/0d/a6/980da6e30db29c2421d991634c3f3194.jpg" className='absolute top-0 right-0 h-full w-full md:block'/>
      <div className='h-full w-full absolute md:hidden top-0 left-0 bg-slate-950 opacity-60'></div>
    </div>
  )
}

export default Login
