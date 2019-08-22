import React, { Component } from 'react'
import CreateNoteForm from './NoteForm'
// import { getNotes } from '../../services/apiService';
import { getNotes } from '../services/apiService';
// import authService from '../../services/authService';
import authService from '../services/authService';

class Notes extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            user: {}, 
            folders: [], 
            notes: [], 
        }
    }
    async componentDidMount() {
        await this.fetchNotes()
    }

    fetchNotes = async () => {
        try {
            let notes 
            const fetchedUsers = await getNotes()
            if(fetchedUsers) {
                fetchedUsers.map(user => {
                    notes = user.notes
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
                    <div key={note.id}>
                        <h4>{note.title}</h4>
                        <h5>{note.content}</h5>
                    </div>
                )
            })
        }
    }
    render() {
        const { notes } = this.state
        return(
            <div>
                <h2>Note List</h2>
                {this.renderNotes(notes)}
            </div>
        )
    }
}

export default Notes