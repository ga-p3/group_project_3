import React, { Component } from 'react'
import './styles/App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route, Link, Switch } from 'react-router-dom'
import { login, signup, getFolders } from './services/apiService'
import authService from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'
// import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      user: {},
      folders: {}
    }
  }


  async componentDidMount () {
    await this.fetchFolders()
  }
  
  async fetchFolders () {
    try {
      const fetchedUser = await getFolders()
  
      this.setState({
        isSignedIn: authService.isAuthenticated(),
        user: fetchedUser
      })
    } catch (e) {
      // throw e
      console.log('Issue fetching token')
    }
  }

  // async componentDidMount() {
  //   try {
  //     let folders
  //     const fetchedUsers = await getFolders()
  //     if (fetchedUsers) {
  //       this.setState({
  //         isSignedIn: authService.isAuthenticated(),
  //         user: fetchedUsers,
  //         folders: fetchedUsers.folders
  //       })
  //     fetchedUsers.map(user=>{
  //       folders = user.folders
  //       return folders
  //     })
  //     }
  //     else {
  //       console.log('no token retrieved on App mount - OK if user not signed in')
  //     }
  //   } catch (e) {
  //     console.log('Issue fetching token on App componentDidMount')
  //     throw e
  //   }
  // }

  loginUser = async (credentials) => {
    try {
      const user = await login(credentials)

      this.setState({
        isSignedIn: true,
        user: user
      })
    } catch (e) {
      throw e
    }
  }

  signOutUser = () => {
    authService.signOut()
    this.setState({
      isSignedIn: false,
      user: {}
    })
  }

  signupUser = async (credentials) => {
    try {
      const user = await signup(credentials)

      this.setState({
        isSignedIn: true,
        user: user
      })
    } catch (e) {
      throw e
    }
  }

  render() {
    const { isSignedIn, user } = this.state

    return (
      <div className='App'>
        <nav>
          <div>
            <Link to='/'>Home</Link>
          </div>

          {isSignedIn &&
            <div className='nav-section'>
              <Link to='/dashboard'>jhordan can't code</Link>

              <button onClick={this.signOutUser}> Sign out</button>
            </div>
          }

          {!isSignedIn &&
            <div className='nav-section'>
              <Link to='/signup'>Signup</Link>
              <Link to='/login'>Login</Link>
            </div>
          }
        </nav>

        <main>
          <Switch>
            <Route exact path='/' component={Home} />

            <ProtectedRoute
              path='/dashboard'
              user={user}
              component={Dashboard}
              user={this.state.user}
              folders={this.state.folders}
            />

            <Route
              path='/login'
              render={
                (props) =>
                  <Login
                    {...props}
                    handleLogin={this.loginUser}
                    isSignedIn={isSignedIn}
                  />
              }
            />

            <Route
              path='/signup'
              render={
                (props) =>
                  <Signup
                    {...props}
                    handleSignup={this.signupUser}
                    isSignedIn={isSignedIn}
                  />
              }
            />
            </Switch>
          </main>
      </div>
    )
  }
}

export default App