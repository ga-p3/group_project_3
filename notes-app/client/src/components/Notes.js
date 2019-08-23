import React, { Component } from 'react';
import CreateNoteForm from './NoteForm';
import { getProfile, getFolders, getNotes, findNotes } from '../services/apiService';
import authService from '../services/authService';
import { Router, Link } from 'react-router-dom';
import { checkServerIdentity } from 'tls';

class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            isSignedIn: authService.isAuthenticated(),
            folders: [],
            notes: [],
            title: '',
            content: ''
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

    renderNotes = (notes) => {
        if (notes) {
            return notes.map(note => {
                return (
                    <div key={note.id}>
                        <Link className="note" to="/specificNote"><h4>{note.title}</h4>
                            <h5>{note.content}</h5></Link>
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