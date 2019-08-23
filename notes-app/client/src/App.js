import React, { Component } from 'react'
import './styles/App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import Notes from './components/Notes'
import Folders from './components/Folders'
import { Route, Link, Switch } from 'react-router-dom'
import { login, signup, getProfile, findNotes } from './services/apiService'
import authService from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'
import Axios from 'axios';
// import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      user: {},
      folders: {},
      notes: {}
    }
  }


  async componentDidMount() {
    await this.fetchFolders()
    // await this.fetchNotes()
  }

  async fetchFolders() {
    try {
      const fetchedUser = await getProfile()

      this.setState({
        isSignedIn: authService.isAuthenticated(),
        user: fetchedUser
      })
    } catch (e) {
      throw e
      // console.log('Issue fetching token')
    }
  }

  // async fetchNotes() {
  //   try {
  //     const findAllNotes = await findNotes()
  //     // put notes in state
  //     this.setState({
  //       isSignedIn: authService.isAuthenticated(),
  //       notes: findAllNotes
  //     })
  //     console.log('notes from user', findAllNotes)
  //   } catch (error) {
  //     console.log('help notes')
  //   }
  // }

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
    // console.log('yo this user',user)
    // console.log('state notes', this.state.notes)

    return (
      <div className='App'>
        <nav>
          <div>
            <Link className="link" to='/'>Home</Link>
            <Link to='/dashboard'>Dashboard</Link>
          </div>

          {isSignedIn &&
            <div className='nav-section'>
<<<<<<< Updated upstream
              <Link
                className="link"
                id="username"
                to='/dashboard'>
                  {this.state.user.name}
              </Link>
              <Link to='/dashboard'>{this.state.user.name}</Link>
=======
              <Link to='/dashboard'>Dashboard</Link>

>>>>>>> Stashed changes
              <button onClick={this.signOutUser}> Sign out</button>
            </div>
          }

          {!isSignedIn &&
            <div className='nav-section'>
              <Link className="link" to='/signup'>Sign Up</Link>
              <Link className="link" to='/login'>Log In</Link>
            </div>
          }
        </nav>

        <main>
          <Switch>
            <Route className="link"
              exact path='/'
              component={Home}
            />
            <ProtectedRoute
              path='/dashboard'
              user={user}
              component={Dashboard}
              folders={this.state.folders}
            />
            <Route // Why can't this be a protected route
              path='/folder/:folder_id'
              user={user}
              render={(props) => (
                <Notes
                  {...props}
                  key={Math.random() * 4}
                  user={user}
                  signedIn={this.fetchFolders}
                />
              )}
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
              className="link"
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