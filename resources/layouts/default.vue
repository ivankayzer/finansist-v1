<template>
  <div class="container" id="app">
    <div class="columns">
      <div class="column is-one-quarter">
        <navigation/>
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
