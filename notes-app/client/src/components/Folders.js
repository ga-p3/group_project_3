import React from 'react'
import { getFolders } from '../services/apiService'
import authService from '../services/authService'
import '../styles/Folder.css'

class Folders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            folders: [],
            title: '',
            showError: false
        }
    }

    async componentDidMount() {
        await this.fetchFolders()
    }

    fetchFolders = async () => {
        try {
            let folders
            const fetchedUsers = await getFolders()
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

    renderFolders = (folders) => {
        if (folders) {
            return folders.map(folder=>{
                return(
                    <div key={folder.id}>
                        <h4 className='folder-title'>{folder.title}</h4>
                    </div>
                )
            })
        }
    }


    render() {
        const { folders } = this.state
        console.log(folders)
        return (
            <div>
                <h2>Folder List</h2>
                {this.renderFolders(folders)}
            </div>
        )
    }
}

export default Folders 