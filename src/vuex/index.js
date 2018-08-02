import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service.js'
import postsModule from './posts.js'

Vue.use(Vuex)

const state = {
  isAuthenticated: false
}

const store = new Vuex.Store({
  modules: {
    postsModule
  },
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },
  // used to call mutations and hide the logic from outside
  actions: {
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
  },
  mutations: {
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
})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoader', function (event) {
    let expiration = window.localStorage.getItem('tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0)
      store.state.isAuthenticated = true;
  })
}

export default store
