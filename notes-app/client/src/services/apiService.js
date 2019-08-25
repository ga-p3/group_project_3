import axios from 'axios'
const BASE_URL = 'http://localhost:4567'

const JWT_TOKEN = localStorage.getItem('token')

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${JWT_TOKEN}`
  }
})

export const login = async(data) => {
  try {
    const response = await api.post('/auth/login', data)
    const { data: { token, user } } = response

    // console.log(response.data)
    localStorage.setItem('userId', user.id)
    localStorage.setItem('token', token)
    return user
  } catch (e) {
    throw e
  }
}

export const signup = async(data) => {
  try {
    const response = await api.post('/auth/signup', data)
    const { data: { token, user } } = response

    localStorage.setItem('token', token)
    return user
  } catch (e) {
    throw e
  }
}

export const getProfile = async() => {
  try {
    const id = localStorage.getItem('userId')
    const response = await api.get(`/user/${id}`)
    let { data } = response
    return data
  } catch (error) {
    console.error('no folders retrieved in apiService getFolders - OK if user not signed in')
    // throw error
  }
}

// export const getNotes = async() => {
//   try {
//     const iduser = localStorage.getItem('userId')
//     const idfolder = localStorage.getItem('folderId')
//     const response = await api.get(`/user/${iduser}/folders/${idfolder}`)
//     let { data } = response 
//     return data 
//   } catch (error) {
//     console.log('no notes retrieved in apiService getNotes - Ok if user not signed in')
//     throw error
//   }
// }


export const makeFolders = async (newFolder) => {
  try {
    const response = await api.post('/folders', newFolder)
    let { data } = response
    const id = localStorage.getItem('userId')
    data.userId = id
    return data
  } catch (error) {
    console.error('ERROR SENDING API REQ TO API.POST')
  }
}

export const findNotes = async (notesId) => {
  try {
    const id = notesId
    const response = await api.get(`/user/${id}/notes`)
    let { data } = response
    // console.log(data)
    return data
  } catch (error) {
    console.error('error in apiservice findnotes')
  }
}


export const updateFolder = async (id, folder) => {
  try {
    const response = await api.put(`/folders/${id}`, folder)
    console.log(response)
  } catch (error) {
    console.error('apiservice updatefolder')
  }
}


export const deleteFolder = async (folderId) => {
  try {
    const id = folderId
    await api.delete(`/folders/${id}`)
  } catch (error) {
    console.error('apiservice deletefolder error')
  }
}

export const deleteNote = async (noteId) => {
  try {
    const id = noteId
    await api.delete(`/notes/${id}`)
  } catch (error) {
    console.error('apiservice deletenote error')
  }
}

export const makeNotes = async (noteBody, user_id, folder_id) => {
  try {
    
    const note = await api.post(`/user/${user_id}/folders/${folder_id}/notes`, noteBody)
    console.log(note)
  } catch (error) {
    console.log('Error sending API to REQ to API.POST to Create Note')
  }
}

export const updateNote = async (id, note) => {
  try {
    const response = await api.put(`/notes/${id}`, note)
    console.log(response)
  } catch (error) {
    console.error('apiservice updatefolder')
  }
}