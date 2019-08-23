import React, { Component } from 'react';
import CreateNoteForm from './NoteForm';
import { getProfile, getFolders, getNotes, findNotes, deleteNote } from '../services/apiService';
import authService from '../services/authService';
<<<<<<< HEAD:client/src/components/Notes.js
import { Router, Link } from 'react-router-dom'; 
// import { checkServerIdentity } from 'tls';
import Axios from 'axios'
=======
import { Router, Link } from 'react-router-dom';
import { checkServerIdentity } from 'tls';
>>>>>>> develop:notes-app/client/src/components/Notes.js

class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
<<<<<<< HEAD:client/src/components/Notes.js
            user: {}, 
            isSignedIn: false,
            folders: [], 
            notes: [], 
            title: '', 
            content: '',
            delete: false
=======
            user: props.user,
            isSignedIn: authService.isAuthenticated(),
            folders: [],
            notes: [],
            title: '',
            content: ''
>>>>>>> develop:notes-app/client/src/components/Notes.js
        }
    }
    async componentDidMount() {
        try {
            const id = await this.state.user[0].id
            const notes = await this.findNotes(id)
            console.log('NJS CDM',notes)
        } catch (error) {
            console.log('component mount error notesjs')
        }
    }

    fetchNotes = async () => {
        try {
            let notes 
            const fetchedUsers = await getProfile()
            // console.log('this is fetched users',fetchedUsers)
            if(fetchedUsers) {
                fetchedUsers.map(user => {
                    notes = user.folders.notes
                    return notes
                })
                this.setState({
                    isSignedIn: authService.isAuthenticated(), 
                    user: fetchedUsers, 
                    notes: notes
                })
            }
        } catch (error) {
            throw error
        }
    }

    handleDelete = async (event) => {
        // event.preventDefault()
        // let id = this.props.match.params.id
        // console.log(id)
        // await Axios.delete(`/folders/${id}`)
        // this.setState({ deleted: true })


        event.preventDefault()
        const id = event.target.value
        await deleteNote(id)
        this.setState({ deleted: true })

    }

    renderNotes = async () => {
        if (this.state.notes) {
            return await this.state.notes.map(note => {
                return (
                    <div key={note.id}>
                        <Link className="note" to="/specificNote"><h4>{note.title}</h4>
<<<<<<< HEAD:client/src/components/Notes.js
                        <h5>{note.content}</h5></Link>
                        <button onClick={this.handleDelete} value={note.id} >Delete</button>
=======
                            <h5>{note.content}</h5></Link>
>>>>>>> develop:notes-app/client/src/components/Notes.js
                    </div>
                )
            })
        }
    }

    handleClick = async (event) => {
        event.preventDefault()
        const folderId = await this.props.folder[0].id
        const { title, content } = this.state
        let showNotes = { title, content, folderId }
        const notes = await findNotes(showNotes)
        console.log(notes)
        this.setState({ notes: notes })
        await this.props.history.push('/folder/${folder.id}')
    }

    render() {
        console.log('yoyo notes js props', this.props)
        const { notes, user } = this.state
        return (
            <div className="note-list" onClick={this.handleClick}>
                <h2>Note List</h2>
                <div className="note-container">
                    {this.state.notes}
                </div>
                <CreateNoteForm user={user} fetchNotes={this.fetchNotes} />
            </div>
        )
    }
}

export default Notes