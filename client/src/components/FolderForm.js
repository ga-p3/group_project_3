import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { makeFolders } from '../services/apiService'
// import Axios from 'axios';

class CreateFolderForm extends Component {
    constructor(props) {
        super(props)
        this.props = props
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
        // const user = this.props.user[0]
        const userId = await this.props.user[0].id
        // console.log(userId)
        const { title } = this.state

        let newFolder = { title, userId }
        // console.log('FolderForm, handleSubmit',newFolder)
        await makeFolders(newFolder)
        const folders = this.state.folders
        this.setState({folders: [...folders], created: true})

        await this.props.fetchFolders()
    }
    render() {
        return(
            <div className="folder-form">
                <form
                    onSubmit={this.handleSubmit}
                >
                    <label>New Folder</label>
                    <input type="text" name="title" placeholder="New Folder Title"onChange={this.handleChange} value={this.state.title} />
                    <button type="submit">Create Folder</button>
                </form>
            </div>
        )
    }
}

export default CreateFolderForm