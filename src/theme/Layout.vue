<template>
  <div>
    <app-header></app-header>
    <section class="main-section section">
      <div class="container content">
        <!-- here the router injects the component declared in this path -->
        <router-view></router-view>
      </div>
    </section>
  <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import Footer from './Footer.vue'

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer
    }
  }
</script>

<style lang="scss">
  $primary: #287ab1;
  @import '~bulma';

  .columns {
    flex-wrap: wrap;
  }
</style>
