<template>
  <div>
    <section>
        <b-field label="Имя пользователя">
            <b-input placeholder="johndoe" v-model="username" type="text" maxlength="30"></b-input>
        </b-field>

        <b-field label="Пароль">
            <b-input placeholder="***********" v-model="password" value="" type="password" maxlength="30"></b-input>
        </b-field>

        <b-field>
            <p class="control">
                <button class="button is-link" @click="login">
                  Войти
                </button>
            </p>
        </b-field>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {username: this.username, password: this.password});
    }
  }
}
</script>
