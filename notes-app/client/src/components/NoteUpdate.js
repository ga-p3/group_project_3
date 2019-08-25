import React, { Component } from 'react'
import { makeNotes, updateNote } from '../services/apiService'

class NoteUpdate extends Component {
  constructor(props){
    super(props){
      this.props = props
      this.state = {
        title: '',
        content: '',
        noteId: props.noteId,
        updated: false
      }
    }
  }

  handleChange = (event) => {
    const{ title, content, value } = event.target
    this.setState({
      [title]: value,
      [content]: value
    })
  }

  handleUpdate = async (event) => {
    const id = this.state.noteId

  }

  render(){
    return(
      <form />
    )
  }

}