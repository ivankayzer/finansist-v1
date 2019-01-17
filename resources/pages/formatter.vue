<template>
  <div>
    <h1 class="title">Форматирование</h1>
    <a class="button is-link is-rounded my-15" @click="addNew">Добавить новую</a>
    <div class="block" v-for="(element, index) in actions">
      <hr>
      <a class="delete" @click="remove(index)"></a>
      <b-radio v-model="element.action" type="is-dark"
               native-value="crop">
        Удалить текст
      </b-radio>
      <b-radio v-model="element.action" type="is-dark"
               native-value="ignore">
        Игнорировать
      </b-radio>
      <b-radio v-model="element.action" type="is-dark"
               native-value="assign">
        Приписать к категории
      </b-radio>

      <div class="columns">
        <div class="column is-half">
          <b-field>
            <b-input placeholder="Искомая фраза" type="text" class="mt-15" v-model="element.match"></b-input>
          </b-field>
        </div>
        <div class="column" v-if="element.action === 'assign'">
          <b-select placeholder="Без категории" class="mt-15" v-model="element.additional_data.category_id">
            <option
              v-for="option in categories"
              :value="option.id"
              :key="option.id">
              {{ option.name }}
            </option>
          </b-select>
        </div>
        <div class="column">
          <a class="button is-warning mt-15" v-if="element.id && canBeSaved(element)">Изменить</a>
          <a class="button is-success mt-15" v-if="!element.id && canBeSaved(element)">Сохранить</a>
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
    data() {
      return {
        actions: []
      }
    },
    computed: {
      categories() {
        return this.$store.getters.categories
      }
    },
    methods: {
      addNew() {
        this.actions.unshift({
          action: null,
          match: null,
          additional_data: {
            category_id: null
          }
        })
      },
      save() {},
      update() {},
      remove(index) {
        this.actions = this.actions.filter((element, i) => i !== index)
      },
      canBeSaved(element) {
        if (!element.action || !element.match) {
          return false;
        }

        if (element.action === 'assign' && !element.additional_data.category_id) {
          return false;
        }

        return true;
      }
    },
    beforeMount() {
      this.$store.dispatch('getCategories')
    }
  }
</script>
