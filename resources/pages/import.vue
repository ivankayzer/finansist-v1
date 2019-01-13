<template>
  <div>
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
    <section class="mt-30" v-if="this.$store.state.imports.transactions.length">
      <b-table
        :data="this.$store.state.imports.transactions"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
      >
        <template slot-scope="props">
          <b-table-column
            v-for="(transaction, index) in props.row"
            :key="index"
            :field="String(index)"
            :label="String(index)"
            width="40"
          >{{ props.row[index] }}</b-table-column>
        </template>
        <template slot-scope="props" slot="header">
          <b-select class="header-select" @input="selectHeader">
            <option value="original_title">Титул</option>
            <option value="amount">Сумма</option>
            <option value="paid_at">Дата</option>
          </b-select>
        </template>
      </b-table>

      <b-field v-if="this.$store.state.imports.transactions.length">
        <p class="control">
          <button class="button is-link" @click="addTransactions">Добавить</button>
        </p>
      </b-field>
    </section>
  </div>
</template>

<style scoped>
.mt-30 {
  margin-top: 30px;
}
</style>


<script>
export default {
  data() {
    return {
      files: null,
      isPaginated: true,
      isPaginationSimple: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 5,
      columns: {}
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
    },
    addTransactions() {
      this.$store.dispatch('importTransactions', {
        columns: this.columns,
        filename: this.$store.state.imports.filename
      })
    },
    selectHeader(el) {
      Array.from(document.querySelectorAll('.header-select')).map((element, index) => {
        let value = element.querySelector('select').value;
        if (value) {
          this.columns[index] = value;
        }
      })
    }
  }
}
</script>
