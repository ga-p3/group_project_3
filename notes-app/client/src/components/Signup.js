import React from 'react'
import SignupForm from './SignupForm'
import { Link } from 'react-router-dom'
import '../styles/Signup.css'

function Signup (props) {


  return (
    <div>
      <h1>Signup</h1>

      <SignupForm {...props} />
      <h4>Existing Users Log In Below</h4>
      <Link to='/login'>Log In</Link>
    </div>
  )
}

export default Signup