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
                <button class="button is-link" @click="register">
                  Зарегестрироваться
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
    register() {
      this.$store.dispatch('register', {username: this.username, password: this.password}).then(() =>  this.$router.push({ path: '/' }));
    }
  }
}
</script>
