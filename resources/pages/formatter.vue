<template>
  <div>
    <h1 class="title">Форматирование</h1>
    <a class="button is-link is-rounded my-15" @click="addNew">Добавить новую</a>
    <div class="block" v-for="(element, index) in actions" :key="index">
      <hr>
      <a class="delete" @click="remove(element, index)"></a>
      <b-radio v-model="element.action" type="is-dark" native-value="crop">Удалить текст</b-radio>
      <b-radio v-model="element.action" type="is-dark" native-value="ignore">Игнорировать</b-radio>
      <b-radio v-model="element.action" type="is-dark" native-value="assign">Приписать к категории</b-radio>

      <div class="columns">
        <div class="column is-half">
          <b-field>
            <b-input placeholder="Искомая фраза" type="text" class="mt-15" v-model="element.match"></b-input>
          </b-field>
        </div>
        <div class="column" v-if="element.action === 'assign'">
          <b-select
            placeholder="Без категории"
            class="mt-15"
            v-model="element.additional_data.category_id"
          >
            <option
              v-for="option in categories"
              :value="option.id"
              :key="option.id"
            >{{ option.name }}</option>
          </b-select>
        </div>
        <div class="column">
          <a
            class="button is-warning mt-15"
            v-if="element.id && canBeSaved(element)"
            @click="update(element)"
          >Изменить</a>
          <a
            class="button is-success mt-15"
            v-if="!element.id && canBeSaved(element)"
            @click="save(element)"
          >Сохранить</a>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<style scoped>
.my-15 {
  margin: 15px 0;
}

.block {
  margin-top: 10px;
}

.mt-15 {
  margin-top: 35px;
}

.delete {
  float: right;
  margin-right: 30px;
}
</style>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters.categories
    },
    actions() {
      return this.$store.state.actions.actions
    }
  },
  methods: {
    addNew() {
      this.actions.unshift({
        internal_id: this.generateId(),
        action: null,
        match: null,
        additional_data: {
          category_id: null
        }
      })
    },
    save(element) {
      this.$store.dispatch('saveAction', element)
    },
    update(element) {
      this.$store.dispatch('updateAction', element)
    },
    remove(element, index) {
      if (element.id) {
        this.$store.dispatch('deleteAction', element)
      } else {
        this.$store.commit(
          'setActions',
          this.actions.filter((element, i) => i !== index)
        )
      }
    },
    generateId() {
      return (
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 9)
      )
    },
    canBeSaved(element) {
      if (!element.action || !element.match) {
        return false
      }

      if (element.action === 'assign' && !element.additional_data.category_id) {
        return false
      }

      return true
    }
  },
  beforeMount() {
    this.$store.dispatch('getCategories')
    this.$store.dispatch('fetchActions')
  }
}
</script>
