import React from 'react'
import Folders from './Folders'

class Dashboard extends React.Component {
  constructor (props) {
    super (props) 
    this.state = {
      user: {}, 
      folders: {}, 
    }
    // this.props = props
  }

  render() {
    // const { user } = props
    // console.log(user)
    // const name = (user.name !== undefined) ? user.name : ''
    // // console.log('yo props',this.props)
    return(
      <div>
           <h1>Dashboard</h1>
           {/* <p>{`Welcome back ${name}`}</p> */}
           <Folders user={this.props.user} folders={this.props.user.folders}
           />
      </div>
    )
  }
}
export default Dashboard