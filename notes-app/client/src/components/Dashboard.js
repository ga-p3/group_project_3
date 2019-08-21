import React from 'react'
import Folders from './Folders'

class Dashboard extends React.Component {
  constructor (props) {
    super (props) 
    this.state = {
      user: {}, 
      folders: {}, 
    }
  }

  render() {
    // const { user } = props
    // const name = (user.name !== undefined) ? user.name : ''
    return(
      <div>
           <h1>Dashboard</h1>
           {/* <p>{`Welcome back ${name}`}</p> */}
           <Folders />
      </div>
    )
  }
}

export default Dashboard