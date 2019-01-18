<template>
  <div>
    <h1 class="title">
      Транзакции
      <a class="button is-small is-link is-rounded" @click="format">Форматировать</a>
      <div class="float-right">
        <b-tag
          type="is-dark"
          rounded
        >Всего: {{ this.$store.state.transactions.transactions.length }}</b-tag>
        <b-tag rounded>Не отформатированные: {{ this.$store.state.transactions.unformattedCount }}</b-tag>
      </div>
    </h1>
    <section>
      <b-table
        :data="data"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :default-sort-direction="defaultSortDirection"
        detailed
        detail-key="id"
        default-sort="user.first_name"
      >
        <template slot-scope="props">
          <b-table-column
            field="id"
            label="ID"
            width="20"
            sortable
            numeric
            centered
          >{{ props.row.id }}</b-table-column>

          <b-table-column
            field="date"
            label="Дата"
            width="40"
            centered
          >{{ new Date(props.row.paid_at).toLocaleString('ru').split(',').shift() }}</b-table-column>

          <b-table-column field="title" label="Титул" width="100">
            {{ (props.row.formatted_title && props.row.formatted_title.length) ? props.row.formatted_title :
            props.row.original_title }}
          </b-table-column>

          <b-table-column field="amount" label="Сумма" width="50" sortable centered>
            <p
              :class="props.row.amount > 0 ? 'has-text-primary' : 'has-text-danger'"
            >{{ props.row.amount }}</p>
          </b-table-column>

          <b-table-column field="category" label="Категория" width="50" centered>
            <b-select
              :value="props.row.category_id"
              :data-id="props.row.id"
              placeholder="Без категории"
              @input.native="changeCategory"
            >
              <option
                v-for="option in categories"
                :value="option.id"
                :key="option.id"
              >{{ option.name }}</option>
            </b-select>
          </b-table-column>

          <b-table-column field="is_formatted" label="Формат" width="20" centered>
            <span
              class="tag is-success"
              v-if="props.row.formatted_title && props.row.formatted_title.length"
            >Да</span>
            <span class="tag is-danger" v-else>Нет</span>
          </b-table-column>

          <b-table-column field="is_ignored" label="Игнор" width="20" sortable centered>
            <b-checkbox
              :value="props.row.is_ignored"
              :data-id="props.row.id"
              type="is-warning"
              @input.native="changeIgnored"
            ></b-checkbox>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>{{ props.row.original_title }}</p>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </section>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 50px;
}

.title > .button {
  margin-top: 5px;
  margin-left: 10px;
}

.float-right {
  float: right;
}
</style>


<script>
export default {
  data() {
    return {
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10
    }
  },
  computed: {
    data() {
      return this.$store.state.transactions.transactions
    },
    categories() {
      return this.$store.getters.categories
    }
  },
  beforeMount() {
    this.$store.dispatch('getCategories')
    this.$store.dispatch('fetchTransactions')
    this.$store.dispatch('fetchUnformattedCount')
  },
  methods: {
    format() {
      this.$store.dispatch('format')
    },
    changeCategory(event) {
      this.$store.dispatch('updateTransactionCategory', {
        categoryId: event.target.value,
        id: event.target.dataset.id
      })
    },
    changeIgnored(event) {
      this.$store.dispatch('updateTransactionIgnored', {
        isIgnored: Boolean(event.target.checked),
        id: event.target.parentElement.dataset.id
      })
    }
  }
}
</script>
