import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const nav = useNavigate();
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
        <h1 className='text-2xl font-semibold'>404 Not Found</h1> 
        <button onClick={()=> nav("/")} className='underline'>Go to homepage</button>
    </div>
  )
}

export default ErrorPage