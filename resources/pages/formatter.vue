<template>
  <div>
    <h1 class="title">Форматирование</h1>

    <b-field>
      <b-radio-button v-model="action"
                      native-value="Nope"
                      type="is-danger">
        <b-icon icon="close"></b-icon>
        <span>Nope</span>
      </b-radio-button>

      <b-radio-button v-model="action"
                      native-value="Yep"
                      type="is-success">
        <b-icon icon="check"></b-icon>
        <span>Yep</span>
      </b-radio-button>

      <b-radio-button v-model="action"
                      native-value="Default">
        Default
      </b-radio-button>
    </b-field>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        action: ''
      }
    }
  }
</script>
