<template>
  <div class="tabs">
    <ul>
      <li><div><router-link :to="{ name: 'category', params: { id: 'front-end' } }">Front-End</router-link></div></li>
      <li><div><router-link :to="{ name: 'category', params: { id: 'mobile' } }">Mobile</router-link></div></li>
      <li><div><router-link to="/login">Login</router-link></div></li>
    </ul>
  </div>
</template>
