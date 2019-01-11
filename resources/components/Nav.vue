<template>
  <aside class="menu">
    <ul class="menu-list" v-if="!Object.keys(this.$store.state.user).length">
      <li>
        <nuxt-link to="/login">Войти</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/register">Регистрация</nuxt-link>
      </li>
    </ul>
    <ul class="menu-list" v-if="Object.keys(this.$store.state.user).length">
      <li>
        <nuxt-link to="/">Главная</nuxt-link>
      </li>
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
        <nuxt-link to="/reports">Отчеты</nuxt-link>
      </li>
      <p class="menu-label"></p>
      <li>
        <nuxt-link to="/logout">Выйти</nuxt-link>
      </li>
    </ul>
  </aside>
</template>
