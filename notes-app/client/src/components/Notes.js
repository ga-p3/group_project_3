import React, { Component } from 'react';
import CreateNoteForm from './NoteForm';
import { getProfile, getFolders, getNotes, findNotes } from '../services/apiService';
import authService from '../services/authService';
import { Router, Link } from 'react-router-dom'; 
import { checkServerIdentity } from 'tls';

class Notes extends Component {
    constructor(props) {
        super(props) 
        this.props = props
        this.state = {
            user: {}, 
            isSignedIn: false,
            folders: [], 
            notes: [], 
            title: '', 
            content: ''
        }
    }
    async componentDidMount() {
        await this.fetchNotes()
    }

    fetchNotes = async () => {
        try {
            let notes 
            const fetchedUsers = await getProfile()
            console.log('this is fetched users',fetchedUsers)
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

    renderNotes = (notes) => {
        if (notes) {
            return notes.map(note => {
                return (
                    <div className="note-container" key={note.id}>
                        <h4 className="note-title">{note.title}</h4>
                        <h5 className="note-content">{note.content}</h5>
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
        const { notes, user } = this.state
        return(
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