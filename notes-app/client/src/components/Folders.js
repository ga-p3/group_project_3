import React from 'react'
import { getProfile, deleteFolder } from '../services/apiService'
import authService from '../services/authService'
import { Route, Link } from 'react-router-dom'
import CreateFolderForm from './FolderForm'
import FolderUpdate from './FolderUpdate'
import Notes from './Notes';
import NoteForm from './NoteForm'
import '../styles/Folders.css'

class Folders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            folders: [],
            notes: [],
            title: '',
            showError: false,
            name: '',
            value: '',
            showForm: false
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

    handleChange = (e) => {
        const id = e.target.parentNode.id
        // if (id === )
        // console.log(this.state.folders)
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleDelete = async (event) => {
        // event.preventDefault()
        // const id = event.target.parentElement
        // console.log(id)
        // event.target.parentElement.remove()
        const id = event.target.value
        // await Axios.delete(`/folders/${id}`)
        await deleteFolder(id)
        this.setState({ deleted: true })
        await this.fetchFolders()
    }

    handleUpdate = async (event) => {
        event.preventDefault()
        const id = event.target.value

    }


    renderFolders = (folders) => {
        if (folders) {
            return folders.map(folder => {
                return (
                    <div className="folder-item" key={folder.id}>
                        <Link className="folder-link" to={`/folder/${folder.id}`}>
                            <h5>{folder.title}</h5>
                        </Link>
                        <div>
                            <FolderUpdate folderId={folder.id}/>
                            <button onClick={this.handleDelete} value={folder.id}>Delete</button>
                        </div>
                    </div>
                )
            })
        }
    }

    // render() {
    //     const { folders, user } = this.state
    //     // console.log('foldersJs this.state.folders',folders)
    //     // console.log('folderJS this.state.users', user)
    //     // console.log('user',user)
    //     console.log('folders lol', folders)
    //     return (
    //         <div className="folder-list">
    //             <h2>Folder List</h2>
    //             <div className="folder-container">
    //                 {folders.map(folder => {
    //                     return (
    //                         <div className="folder" key={folder.id} folderid={folder.id}>
    //                             <Link to={`/folders/${folder.id}`} folderid={folder.id}><h5>{folder.title}</h5></Link>
    //                         </div>
    //                     )
    //                 })}
    //             </div>
    //             {/* <Notes user={this.props.user} folders={this.props.user.folders.notes} /> */}
    //             <CreateFolderForm user={user} fetchFolders={this.fetchFolders} />
    //         </div>
    //     )
    // }

    render() {
        const { folders, user } = this.state
        // console.log('foldersJs this.state.folders',folders)
        // console.log('folderJS this.state.users', user)

        return (
            <div className="folder-list">
                <h2>Folder List</h2>
                <div className="folders-container">
                    {this.renderFolders(folders)}

                </div>

                {/* <Notes user={this.props.user} folders={this.props.user.folders.notes} /> */}
                <CreateFolderForm user={user} fetchFolders={this.fetchFolders} value={this.state.value} />

            </div>
        )
    }
}
export default Folders 