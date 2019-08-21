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

    console.log(response.data)
    
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

    console.log(response.data)
    
    localStorage.setItem('token', token)
    return user
  } catch (e) {
    throw e
  }
}

export const getProfile = async() => {
  try {
    const response = await api.get('/app/profile')
    const { data: { user } } = response

    console.log(response.data)

    return user
  } catch (e) {
    console.log('no user retrieved in authService getProfile - OK if user not signed in')
<<<<<<< HEAD
    // throw e
=======
    throw e
>>>>>>> 94855cddc2b287259ad1aeaa0c666d8cae2cbf85
  }
}