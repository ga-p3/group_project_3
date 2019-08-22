import React from 'react'
import authService from '../services/authService'
import { Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'

/**
 * Protected route using React Router
 * https://tylermcginnis.com/react-router-protected-routes-authentication/
 */
function ProtectedRoute ({ component: Component, ...rest }) {
  console.log('ProtectedRouteJs, props passed down:', {...rest})
  let {location} = {...rest} 
  console.log('ProtectedRoute prop history location',location)
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Dashboard {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute