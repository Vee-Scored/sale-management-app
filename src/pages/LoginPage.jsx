import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(()=>{

    if (token) {
      nav("/dashboard")
    }
  },[])
  return (
    <div>
        <Toaster/>
        <LoginForm/>
    </div>
  )
}

export default LoginPage