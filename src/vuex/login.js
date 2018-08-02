import appService from '../app.service.js'

const state = {
  isAuthenticated: false
}

const getters = {
  isAuthenticated: state => state.isAuthenticated
}

const actions = {
  login (context, credentials) {
    return new Promise((resolve) => {
      appService.login(credentials)
        .then(data => {
          context.commit('login', data)
          resolve()
        })
        .catch(() => window.alert('Login failed!'))
    })
  },
  logout (context) {
    context.commit('logout')
  }
}

const mutations = {
  login (state, token) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('token', token.token)
      window.localStorage.setItem('tokenExpiration', token.expiration)
    }
    state.isAuthenticated = true
  },
  logout (state) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('token', null)
      window.localStorage.setItem('tokenExpiration', null)
    }
    state.isAuthenticated = false
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoader', function (event) {
    let expiration = window.localStorage.getItem('tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0)
      store.state.isAuthenticated = true;
  })
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
