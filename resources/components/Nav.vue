<template>
  <div class="menu">
    <div class="menu-list" v-if="!Object.keys(this.$store.state.auth.user).length">
      <div class="left">
        <nuxt-link to="/login">{{ $t('nav.sign-in') }}</nuxt-link>
        <nuxt-link to="/register">{{ $t('nav.sign-up') }}</nuxt-link>
      </div>
    </div>
    <div class="menu-list" v-if="Object.keys(this.$store.state.auth.user).length">
      <div class="left">
        <nuxt-link to="/transactions">{{ $t('nav.transactions') }}</nuxt-link>
        <nuxt-link to="/categories">{{ $t('nav.categories') }}</nuxt-link>
        <nuxt-link to="/import">{{ $t('nav.import') }}</nuxt-link>
        <nuxt-link to="/formatter">{{ $t('nav.formatting') }}</nuxt-link>
        <nuxt-link to="/reports">{{ $t('nav.reports') }}</nuxt-link>
        <nuxt-link to="/budgets">{{ $t('nav.budgets') }}</nuxt-link>
      </div>
      <div class="right">
        <p class="meta">{{ this.$store.state.auth.user.username }}</p>
        <a to="/logout" @click="logout">{{ $t('nav.sign-out') }}</a>
      </div>
    </div>
  </div>
</template>

<style>
.menu {
  margin-bottom: 50px;
}

.menu-list {
  display: flex;
  justify-content: space-between;
}

.menu-list .left,
.menu-list .right {
  display: flex;
}

.meta {
  display: flex;
  align-items: center;
  margin-right: 35px;
}
</style>


<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() =>  this.$router.push({ path: '/' }))
    }
  }
}
</script>

