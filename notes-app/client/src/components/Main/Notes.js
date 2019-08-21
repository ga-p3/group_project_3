import React, { Component } from 'react'
import CreateNoteForm from './NoteForm'
import axios from 'axios'

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
            const notes = await this.props.api.get('/user/:user_id/folders/:folder_id')
            console.log(notes)

            this.setState( { notes: notes.data } )
        } catch (error) {
            throw error
        }
    }

    renderNotes = () => {
        if (this.state.notes.length) {
            return this.state.notes.map((note) => {
                return (
                    <div key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                )
            })
        }
    }
    render() {
        return(
            <div>
                <h2>Note List</h2>
                {this.renderNotes()}
            </div>
        )
    }
}

export default Notes