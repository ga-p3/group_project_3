// import React, { Component } from 'react'
// import { makeNotes, updateNote } from '../services/apiService'

// class NoteUpdate extends Component {
//   constructor(props){
//     super(props){
//       this.props = props
//       this.state = {
//         title: '',
//         content: '',
//         noteId: props.noteId,
//         updated: false
//       }
//     }
//   }

//   handleChange = (event) => {
//     const{ title, content, value } = event.target
//     this.setState({
//       [title]: value,
//       [content]: value
//     })
//   }

//   handleUpdate = async (event) => {
//     const id = this.state.noteId

//   }

//   render(){
//     return(
//       <form />
//     )
//   }

// }




import React, { Component } from 'react'
import { updateNote } from '../services/apiService'

class NoteUpdate extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            content: '',
            name: '',
            value: '',
            folderId: props.folderId,
            noteId: props.noteId,
            noteTitle: props.noteTitle,
            updated: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleUpdate = async (e) => { 
        e.preventDefault()
        const id = this.state.noteId
        let { title } = this.state 
        let { content } = this.state
        content = title
        let newNote = { title: this.state.noteTitle, content }
        console.log('up', newNote)
        await updateNote(id, newNote)
    }

    render() {
        return (
            <form
                onSubmit={this.handleUpdate}
                id={`note-${this.props.noteId }`}
            >
                <label>Update Note</label>
                <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                <button type="submit">Update</button>
            </form>
        )
    }
}

export default NoteUpdate

