<template>
  <section>
    <h1 class="title">{{ $t('common.categories') }}</h1>
    <b-field grouped group-multiline>
      <category
        v-for="category in this.$store.getters.categories"
        :key="category.id"
        :category="category"
      />
    </b-field>

    <h2 class="subtitle">{{ $t('categories.add_new') }}</h2>
    <div class="columns">
      <div class="column is-three-quarters">
        <b-field :label="$t('categories.name')">
          <b-input v-model="name"></b-input>
        </b-field>
      </div>
      <div class="column is-one-quarter">
        <b-field>
          <button class="button is-link add" @click="add">{{ $t('categories.add') }}</button>
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

