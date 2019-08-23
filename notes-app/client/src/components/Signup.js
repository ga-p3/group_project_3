import React from 'react'
import SignupForm from './SignupForm'
import { Link } from 'react-router-dom'
import '../styles/Signup.css'

function Signup (props) {


  return (
    <div id="form">
      <h1>Sign Up</h1>

      <SignupForm {...props} />
      <h4>Existing Users Log In Below</h4>
      <Link to='/login' className="sign-in-link">Log In</Link>
    </div>
  )
}

export default Signup