import React, { Component } from 'react'
import axios from 'axios'
import { makeNotes } from '../services/apiService';

class CreateNoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      props: props,
      user: props.user,
      folders: [],
      note: [],
      title: '',
      content: '',
      showError: false
    }
  }

  handleTitle = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleContent = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleCreate = async (e) => {
    // e.preventDefault()
    try {
      const folderId = this.state.props.props.match.params.folder_id
      const userId = this.state.user[0].id
      const newNote = {
        title: this.state.title,
        content: this.state.content
      }
      console.log(newNote, userId, folderId)
      const makeNote = await makeNotes(newNote, userId, folderId)

      console.log(makeNote)




      // const apiResponse = Axios.post(`/user/${}/folders/${}/notes`)
      // const submitNotes = await axios.post(`/user/:user_id/folders/:folder_id/notes`)
    } catch (error) {
      throw error
    }
  }

  // handleCreate = (e) => {
  //   e.preventDefault()
  //   let { title } = this.state
  //   let newFolder = { title }

  //   // console.log('NoteFormJs handleCreate',title)

  //   // console.log(title)

  //   // let data = await Axios.post('/icecreams', newIceCream)
  //   // this.setState({created:true})
  // }



  render() {
    return (
      <div className="note-form">

        <form 
          onSubmit={this.handleCreate}
        >
          <label>New Note</label>
            <input type="text" name="title" placeholder="New Note Title"value={this.state.title} onChange={this.handleTitle}/>
            <input type="text" name="content" placeholder="New Note Content" value={this.state.content} onChange={this.handleContent}/>
            <button type="submit">Create Note</button>
        </form>

{/* 
        <form handleChange={this.handleChange} onSubmit={this.handleCreate} >
          <label>title</label>
          <input type='text' name='title' defaultValue={this.state.title} />

          <label>content</label>
          <input type='text' name='content' defaultValue={this.state.content} />

          <button>Create</button>
        </form> */}
      </div>
    )
  }
}

export default CreateNoteForm