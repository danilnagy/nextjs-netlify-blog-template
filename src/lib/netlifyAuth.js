import netlifyIdentity from 'netlify-identity-widget'

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  initialize(callback) {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.on('init', (user) => {
      callback(user)
    })
    netlifyIdentity.init()
  },
  authenticate(type, callback) {
    this.isAuthenticated = true
    if (type == "login"){
      netlifyIdentity.open('login')
    } else {
      netlifyIdentity.open('signup')
    }
    netlifyIdentity.on('login', (user) => {
      this.user = user
      callback(user)
      netlifyIdentity.close()
    })
  },
  signout(callback) {
    this.isAuthenticated = false
    netlifyIdentity.logout()
    netlifyIdentity.on('logout', () => {
      this.user = null
      callback()
    })
  },
}

export default netlifyAuth