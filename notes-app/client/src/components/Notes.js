import React, { Component } from 'react';
import CreateNoteForm from './NoteForm';
import { getProfile, getFolders, getNotes, findNotes, deleteNote } from '../services/apiService';
import authService from '../services/authService';
import { Router, Link } from 'react-router-dom';
import { checkServerIdentity } from 'tls';


class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            folders: [],
            notes: [],
            title: '',
            content: '',
            delete: false
        }
    }
    async componentDidMount() {
        if (this.state.user) {
            console.log(this.state.user)
            await this.fetchNotes()
        } else {
            
        }
    }

    // fetchNotes = async () => {
    //     try {
    //         let notes 
    //         const fetchedUsers = await getProfile()
    //         console.log('this is fetched users',fetchedUsers)
    //         if(fetchedUsers) {
    //             fetchedUsers.map(user => {
    //                 notes = user.folders.notes
    //                 return notes
    //             })
    //             this.setState({
    //                 isSignedIn: authService.isAuthenticated(), 
    //                 user: fetchedUsers, 
    //                 notes: notes
    //             })
    //         }
    //     } catch (error) {
    //         throw error
    //     }
    // }


    fetchNotes = async () => {
        try {
            console.log(this.state.user)
            const id = this.state.user[0].id
            // console.log('idFN',id)
            const findAllNotes = await findNotes(id)
            // put notes in state
            this.setState({
                isSignedIn: authService.isAuthenticated(),
                notes: findAllNotes
            })
            //   console.log('notes from user', findAllNotes)
        } catch (error) {
            console.error('help notes', error)
        }
    }

    handleDelete = async (event) => {
        const id = event.target.value
        
        await deleteNote(id)
        this.setState({delete: true})
        await this.fetchNotes()
    }
    
      


    // renderNotes = async () => {
    //     try {

    //         await console.log('NJ RN',this.state.notes)
    //         await this.state.notes.map(note=>{
    //             return (
    //                 <div>
    //                     <h5>{note.title}</h5>
    //                     <h6>{note.content}</h6>
    //                 </div>
    //             )
    //         })
    //     } catch (error) {
    //         console.log('NJ RN')
    //     }
    // }

    // handleClick = async (event) => {
    //     event.preventDefault()
    //     const folderId = await this.props.folder[0].id
    //     const { title, content } = this.state 
    //     let showNotes = { title, content, folderId } 
    //     const notes = await findNotes(showNotes)
    //     console.log(notes)
    //     this.setState({ notes: notes })
    //     await this.props.history.push('/folder/${folder.id}')
    // }

    render() {
        const { notes, user } = this.state
        // console.log('NJR', notes)
        const folderId = this.props.match.params.folder_id
        // console.log('render',this.state.notes)
        return (
            <div className="note-list" onClick={this.handleClick}>
                <h2>Note List</h2>
                <div className="note-container">
                    {/* {this.state.notes} */}
                    {this.state.notes.map(note => {
                        if (note.folderId == folderId) {

                        return (
                            <div key={note.id}>
                                <h3>{note.title}</h3>
                                <h6>{note.content}</h6>
                                
                                <button onClick={this.handleDelete} value={note.id}>Delete</button>
                            </div>
                        )
                        }
                    })}
                </div>
                <CreateNoteForm user={user} fetchNotes={this.fetchNotes} props={this.props} />
            </div>
        )
    }
}

export default Notes