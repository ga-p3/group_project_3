import React from 'react'
import { getProfile } from '../services/apiService'
import authService from '../services/authService'
import { Route, Link } from 'react-router-dom'
import CreateFolderForm from './FolderForm'
import Notes from './Notes';
import Axios from 'axios'
import '../styles/FolderList.css'

class Folders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            folders: [],
            notes: [],
            title: '',
            showError: false,
            delete: false
        }
    }

    async componentDidMount() {
        await this.fetchFolders()
    }

    fetchFolders = async () => {
        try {
            let folders
            const fetchedUsers = await getProfile()
            if (fetchedUsers) {
                fetchedUsers.map(user => {
                    folders = user.folders
                    return folders
                })
                this.setState({
                    isSignedIn: authService.isAuthenticated(),
                    user: fetchedUsers,
                    folders: folders
                })
            }
        } catch (error) {
            throw error
        }
    }
    handleDelete = async (event) => {
        event.preventDefault()
        let id = this.props.match.params.id
        console.log(id)
        await Axios.delete(`/folders/${id}`)
        this.setState({ deleted: true })
    }
    renderFolders = (folders) => {
        if (folders) {
            return folders.map(folder => {
                return (
                    <div key={folder.id}>

                        <Link className="folder" to={`/folder/${folder.id}`} >
                            <h5>{folder.title}</h5>
                        </Link>

                    </div>
                )
            })
        }
    }


    render() {
        const { folders, user } = this.state
        // console.log('foldersJs this.state.folders',folders)
        // console.log('folderJS this.state.users', user)

        console.log('user',user)

        return (
            <div className="folder-list">
                <h2>Folder List</h2>
                <div className="folder-container">
                    {this.renderFolders(folders)}
                </div>

                {/* <Notes user={this.props.user} folders={this.props.user.folders.notes} /> */}
                <CreateFolderForm user={user} fetchFolders={this.fetchFolders}/>

            </div>
        )
    }
}
export default Folders 