import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { makeFolders, getFolders } from '../services/apiService'
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
        console.log(newFolder)
        await makeFolders(newFolder)
        this.setState({created: true})
        const getFolder = await getFolders()
        if (getFolder) {
            console.log('TRYIN TO PUSH HISTORY', this.props.history)
			this.props.history.push('/dashboard')
        }


        
        // await Axios.post('/folders', newFolder)
        // this.setState( { created: true } )
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
        // if (this.state.created) {
        //     return <Redirect to="/dashboard" />
        // }
        return(
            <div>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <label>Folder Name</label>
                    <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                    <button type="submit">Create Folder</button>
                </form>
            </div>
        )
    }
}

export default CreateFolderForm