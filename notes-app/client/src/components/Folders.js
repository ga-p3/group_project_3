import React, { Component } from 'react'
import axios from 'axios'
import CreateFolderForm from './FolderForm'

class Folders extends Component {
    constructor (props) {
        super(props)
        this.state = {
            user: {}, 
            folders: [], 
            notes: [], 
            showError: false
        }
    }

    // async componentDidMount() {
    //     await this.fetchFolders()
    // }

    // fetchFolders = async () => {
    //     try {
    //         const folders = await this.props.api.get('/user/:user_id')
    //         console.log(folders)
    //         this.setState( { folders: folders.data } )
    //     } catch (error) {
    //         throw error 
    //     }
    // }

    renderFolders = () => {
        if (this.state.folders.length) {
            return this.state.folders.map((folder) => {
                return (
                    <div key={folder.id}>
                        <h2>{folder.title}</h2>
                    </div>
                )
            })
        }
    }
    render() {
        return(
            <div>
                <h2>Folder List</h2>
                {this.renderFolders()}
            </div>
        )
    }
}

export default Folders 