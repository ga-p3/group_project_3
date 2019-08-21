import React, { Component } from 'react'
import Axios from 'axios'

class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
      title: '',
      content: ''
    }
  }

  handleChange = (e) => {
    const { title, value } = e.target
    this.setState({ [title]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data ={
        title: this.state.title,
        content: this.state.content
      }
      // const apiResponse = Axios.post(`/user/${}/folders/${}/notes`)
    } catch (error) {
      throw error
    }
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

export default NoteForm