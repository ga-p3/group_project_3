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

export const getFolders = async() => {
  try {
    const id = localStorage.getItem('userId')
    const response = await api.get(`/user/${id}`)
    let { data } = response
    return data
  } catch (e) {
    console.log('no user retrieved in authService getProfile - OK if user not signed in')
    throw e
  }
}

