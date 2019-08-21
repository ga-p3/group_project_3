const authService = {
    isAuthenticated: () => {
      const token = localStorage.getItem('token')
  
      if (!token) {
        console.log('nothing')
        return false
      }
  
      return true
    },
  
    signOut: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  }
  
  export default authService