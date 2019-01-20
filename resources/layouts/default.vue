<template>
  <div class="container" id="app">
    <div class="columns">
      <div class="column is-one-fifth">
        <navigation/>
      </div>
      <div class="column">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Nav'

export default {
  data() {
    return {
      items: [
        { title: 'Home', icon: 'home', to: { name: 'index' } },
        { title: 'Inspire', icon: 'lightbulb', to: { name: 'inspire' } }
      ]
    }
  },
  beforeMount() {
    if (
      !Object.keys(this.$store.state.auth.user).length &&
      localStorage.getItem('token')
    ) {
      this.$store.dispatch('getUser')
    }
  },
  components: {
    Navigation
  }
}
</script>

<style>
#app {
  margin-top: 50px;
}
</style>
