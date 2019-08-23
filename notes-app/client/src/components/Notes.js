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
            folders: [], 
            notes: [], 
            title: '', 
            content: ''
        }
    }
    async componentDidMount() {
        await this.fetchNotes()
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


  async fetchNotes() {
    try {
        const id = await this.state.user[0].id
      const findAllNotes = await findNotes(id)
      // put notes in state
      this.setState({
        isSignedIn: authService.isAuthenticated(),
        notes: findAllNotes
      })
    //   console.log('notes from user', findAllNotes)
    } catch (error) {
      console.log('help notes')
    }
  }


    renderNotes = async () => {
        try {
            
            await console.log('NJ RN',this.state.notes)
            await this.state.notes.map(note=>{
                return (
                    <div>
                        <h5>{note.title}</h5>
                        <h6>{note.content}</h6>
                    </div>
                )
            })
        } catch (error) {
            console.log('NJ RN')
        }
    }

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
        return(
            <div className="note-list" onClick={this.handleClick}>
                    <h2>Note List</h2>
                <div className="note-container">
                    {/* {this.state.notes} */}
                </div>
                {/* <CreateNoteForm user={user} fetchNotes={this.fetchNotes} /> */}
            </div>
        )
    }
}

export default Notes