import React, { Component } from 'react'
import { makeFolders, updateFolder } from '../services/apiService'

class FolderUpdate extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            title: '',
            folderId: props.folderId,
            updated: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }


    handleUpdate = async (e) => { 
        // e.preventDefault()
        const id = this.state.folderId
        let { title } = this.state 
        let updateTitle = { title }
        console.log('up', updateTitle)
        await updateFolder(id, updateTitle)
    }




    render() {
        return (
            <form
                onSubmit={this.handleUpdate}
                id={`folder-${this.props.folderId}`}
            >
                <label>Update Folder Name</label>
                <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                <button type="submit">Update</button>
            </form>
        )
    }
}

export default FolderUpdate

