<template>
  <div class="container" id="app">
<<<<<<< HEAD
    <nav>
      <navigation/>
    </nav>
    <div class="columns view-container">
=======
    <div class="columns">
      <div class="column is-one-fifth">
        <navigation/>
      </div>
>>>>>>> 3fb835bb2e61283a61a40bd383cca9f9a87492e9
      <div class="column">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<style>
.view-container {
  padding: 0.5em;
}
</style>


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
