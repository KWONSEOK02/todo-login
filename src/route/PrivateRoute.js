import React from 'react'
import { Navigate } from "react-router-dom"


const PrivateRoute = ({user, children}) => {
  return (
    user ? children:<Navigate to ="/login"/> // user가 존재하면 <PrivateRoute> 내부의 컴포넌트를 표시 
  )
}
//user값이 있으면? Todopage : redirect to /login

export default PrivateRoute