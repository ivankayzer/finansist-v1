<template>
  <div class="container" id="app">
    <nav>
      <navigation/>
    </nav>
    <div class="columns view-container">
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

#app {
  margin-top: 50px;
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