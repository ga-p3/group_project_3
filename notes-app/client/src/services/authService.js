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
    }
  }
  
  export default authService