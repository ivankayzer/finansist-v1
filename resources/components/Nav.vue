<template>
  <aside class="menu">
    <ul class="menu-list" v-if="!Object.keys(this.$store.state.auth.user).length">
      <li>
        <nuxt-link to="/login">Войти</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/register">Регистрация</nuxt-link>
      </li>
    </ul>
    <ul class="menu-list" v-if="Object.keys(this.$store.state.auth.user).length">
      <li>
        <nuxt-link to="/transactions">Транзакции</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/categories">Категории</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/import">Импорт</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/formatter">Форматирование</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/reports">Отчеты</nuxt-link>
      </li>
      <p class="menu-label"></p>
      <li>
        <a to="/logout" @click="logout">Выйти</a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

