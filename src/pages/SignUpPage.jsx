import React, { useEffect } from 'react'
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const SignUpPage = () => {
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
        <SignUpForm/>
    </div>
  )
}

export default SignUpPage