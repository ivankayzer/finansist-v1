<template>
  <div class="menu">
    <div class="menu-list" v-if="!Object.keys(this.$store.state.auth.user).length">
      <div class="left">
        <nuxt-link to="/login">{{ $t('nav.sign-in') }}</nuxt-link>
        <nuxt-link to="/register">Регистрация</nuxt-link>
      </div>
    </div>
    <div class="menu-list" v-if="Object.keys(this.$store.state.auth.user).length">
      <div class="left">
        <nuxt-link to="/transactions">Транзакции</nuxt-link>
        <nuxt-link to="/categories">Категории</nuxt-link>
        <nuxt-link to="/import">Импорт</nuxt-link>
        <nuxt-link to="/formatter">Форматирование</nuxt-link>
        <nuxt-link to="/reports">Отчеты</nuxt-link>
        <nuxt-link to="/budgets">Бюджеты</nuxt-link>
      </div>
      <div class="right">
        <p class="meta">{{ this.$store.state.auth.user.username }}</p>
        <a to="/logout" @click="logout">Выйти</a>
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

