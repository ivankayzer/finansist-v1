<template>
  <section>
    <h1 class="title">Импорт с файла .csv</h1>
    <h2 class="subtitle">
      Разделитель
      <b>,</b>
    </h2>
    <div class="columns">
      <div class="column is-narrow">
        <b-field class="file">
          <b-upload v-model="files" :native="true" :multiple="false">
            <a class="button is-dark">
              <b-icon icon="upload"></b-icon>
              <span>Загрузить файл</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="file">{{ file.name }}</span>
        </b-field>
      </div>
      <div class="column">
        <b-field v-if="file">
          <p class="control">
            <button class="button is-link" @click="importCsv">Импортировать</button>
          </p>
        </b-field>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      files: null
    }
  },
  computed: {
    file() {
      if (!this.files) {
        return
      }
      return this.files[0]
    }
  },
  methods: {
    importCsv() {
      this.$store.dispatch('uploadCsv', this.file)
    }
  }
}
</script>