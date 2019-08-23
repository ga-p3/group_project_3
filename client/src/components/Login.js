import React from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

function Login (props) {


  return (
    <div id="form">
      <h1>Log In</h1>

      <LoginForm {...props} />
      <h4>New Users Sign Up Below</h4>
      <Link to='/signup' className="sign-in-link">Sign Up</Link>
    </div>
  )
}

export default Login