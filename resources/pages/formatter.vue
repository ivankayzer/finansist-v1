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
    methods: {
      addNew() {
        this.actions.push({
          action: null,
          match: null,
          additional_data: null
        })
      },
      remove(index) {
        this.actions = this.actions.filter((element, i) => i !== index)
      }
    }
  }
</script>
