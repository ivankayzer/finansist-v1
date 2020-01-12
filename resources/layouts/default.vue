<template>
  <div class="container" id="app">
    <loader v-show="this.$store.state.misc.loading" />
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
import Loader from '~/components/Loader'

export default {
  beforeMount() {
    if (
      !Object.keys(this.$store.state.auth.user).length &&
      localStorage.getItem('token')
    ) {
      this.$store.dispatch('getUser').then(() =>  this.$i18n.setLocale(this.$store.state.auth.user.language))
    }
    this.$store.commit('init')
  },
  components: {
    Navigation,
    Loader
  }
}
</script>
