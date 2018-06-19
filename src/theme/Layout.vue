<template>
  <div>
    <app-header></app-header>
    <section class="main-section section">
      <category></category>
    </section>
  <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  import Category from './Category.vue'

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer,
      'category': Category
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
