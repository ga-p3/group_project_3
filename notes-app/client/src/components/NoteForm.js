import React, { Component } from 'react'
import axios from 'axios'

class CreateNoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}, 
      folders: [],
      note: [], 
      title: '',
      content: ''
    }
  }

  handleChange = (e) => {
    const { title, value } = e.target
    this.setState({ [title]: value })
  }

  // handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const data ={ 
  //       title: this.state.title,
  //       content: this.state.content
  //     }
  //     // const apiResponse = Axios.post(`/user/${}/folders/${}/notes`)
  //     // const submitNotes = await axios.post(`/user/:user_id/folders/:folder_id/notes`)
  //   } catch (error) {
  //     throw error
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    let { title } = this.state
    let newFolder = { title }
    console.log('NoteFormJs handleSubmit',title)
    // let data = await Axios.post('/icecreams', newIceCream)
    // this.setState({created:true}
  }

  render() {
    return (
      <div>
        <form handleChange={this.handleChange} onSubmit={this.handleSubmit} >
          <label>title</label>
          <input type='text' name='title' defaultValue={this.state.title} />

          <label>content</label>
          <input type='text' name='content' defaultValue={this.state.content} />

        </form>
      </div>
    )
  }
}

export default CreateNoteForm