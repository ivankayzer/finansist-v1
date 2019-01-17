<template>
  <section>
    <h1 class="title">Категории</h1>
    <b-field grouped group-multiline>
      <category
        v-for="category in this.$store.getters.categories"
        :key="category.id"
        :category="category"
      />
    </b-field>

    <h2 class="subtitle">Добавить новую категорию</h2>
    <div class="columns">
      <div class="column is-three-quarters">
        <b-field label="Название">
          <b-input v-model="name"></b-input>
        </b-field>
      </div>
      <div class="column is-one-quarter">
        <b-field>
          <button class="button is-link add" @click="add">Добавить</button>
        </b-field>
      </div>
    </div>
  </section>
</template>

<style scoped>
.subtitle {
  margin-top: 50px;
}

.add {
  margin-top: 30px;
}
</style>

<script>
import Category from '~/components/Category.vue'

export default {
  data() {
    return {
      name: ''
    }
  },
  beforeMount() {
    this.$store.dispatch('getCategories')
  },
  methods: {
    add() {
      this.$store
        .dispatch('addCategory', {
          name: this.name
        })
        .then(() => {
          this.name = ''
        })
    }
  },
  components: {
    Category
  }
}
</script>

