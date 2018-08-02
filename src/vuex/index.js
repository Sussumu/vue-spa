import Vue from 'vue'
import Vuex from 'vuex'
import postsModule from './posts.js'
import loginModule from './login.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    postsModule,
    loginModule
  },
})

export default store
