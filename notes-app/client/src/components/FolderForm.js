import React, { Component } from 'react'
import axios from 'axios'

class CreateFolderForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            user: {}, 
            folders: [], 
            title: '',
            showError: false
        }
    }

    handleChange = (event) => {
        const { title, value } = event.target
        this.setState( { [title]: value } )
    }

    handleSubmit = async (event) => { 
        event.preventDefault()
        try {
            const data = {
                title: this.state.title
            }
            const submitFolder = await axios.post(`'/user/:user_id/folders'`)
            console.log(submitFolder)
        } catch (error) {
            throw error
        }
    }
    render() {
        return(
            <div>
                <form
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                >
                    <label>Folder Name</label>
                    <input type="text" name="title" value={this.state.title} />
                    <button type="submit">Create Folder</button>
                </form>
            </div>
        )
    }
}

export default CreateFolderForm