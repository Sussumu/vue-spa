<template>
  <div class="tabs">
    <ul>
      <li><div><router-link :to="{ name: 'category', params: { id: 'front-end' } }">Front-End</router-link></div></li>
      <li><div><router-link :to="{ name: 'category', params: { id: 'mobile' } }">Mobile</router-link></div></li>
      <li><div><router-link to="/login"><span v-if="isAuthenticated">Logout</span><span v-else>Login</span></router-link></div></li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('loginModule', ['isAuthenticated'])
    }
  }
</script>
