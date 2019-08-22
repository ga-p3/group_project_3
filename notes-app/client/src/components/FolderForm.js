import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

class CreateFolderForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            user: {}, 
            folders: [], 
            title: '',
            showError: false, 
            created: false
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState( { [name]: value } )
    }
    handleSubmit = async (event) => { 
        event.preventDefault()
        const { title } = this.state
        let newFolder = { title }

        await Axios.post('/user/:user_id/folders', newFolder)
        this.setState( { created: true } )
    }
    //     try {
    //         const data = {
    //             title: this.state.title
    //         }
    //         const submitFolder = await axios.post(`'/user/:user_id/folders'`)
    //         console.log(submitFolder)
    //     } catch (error) {
    //         throw error
    //     }
    // }
    render() {
        if (this.state.created) {
            return <Redirect to="/user/:user_id/folders" />
        }
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