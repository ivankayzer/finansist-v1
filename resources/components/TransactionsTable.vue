<template>
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
      <b-table-column field="id" label="ID" width="20" sortable numeric centered>{{ props.row.id }}</b-table-column>

      <b-table-column
        field="date"
        :label="$t('common.date')"
        width="40"
        centered
      >{{ new Date(props.row.paid_at).toLocaleString('ru').split(',').shift() }}</b-table-column>

      <b-table-column field="title" :label="$t('transactions.title')" width="100">
        {{ (props.row.formatted_title && props.row.formatted_title.length) ? props.row.formatted_title :
        props.row.original_title }}
      </b-table-column>

      <b-table-column field="amount" :label="$t('transactions.sum')" width="50" sortable centered>
        <p
          :class="props.row.amount > 0 ? 'has-text-primary' : 'has-text-danger'"
        >{{ props.row.amount }}</p>
      </b-table-column>

      <b-table-column field="category" :label="$t('common.category')" width="50" centered>
        <b-select
          :value="props.row.category_id"
          :data-id="props.row.id"
          :placeholder="$t('common.no_category')"
          @input.native="changeCategory"
        >
          <option v-for="option in categories" :value="option.id" :key="option.id">{{ option.name }}</option>
        </b-select>
      </b-table-column>

      <b-table-column field="is_formatted" :label="$t('transactions.format')" width="20" centered>
        <span
          class="tag is-success"
          v-if="props.row.formatted_title && props.row.formatted_title.length"
        >{{ $t('common.yes') }}</span>
        <span class="tag is-danger" v-else>{{ $t('common.no') }}</span>
      </b-table-column>

      <b-table-column field="is_ignored" :label="$t('transactions.ignore')" width="20" sortable centered>
        <b-checkbox
          :value="props.row.is_ignored"
          :data-id="props.row.id"
          type="is-warning"
          @input.native="changeIgnored"
        ></b-checkbox>
      </b-table-column>

      <b-table-column field="immutable" :label="$t('transactions.immutable')" width="20" centered>
        <b-checkbox
          :value="props.row.immutable"
          :data-id="props.row.id"
          type="is-warning"
          @input.native="changeImmutable"
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
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10
    }
  },
  beforeMount() {
    this.$store.dispatch('getCategories')
  },
  methods: {
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
    },
    changeImmutable(event) {
      this.$store.dispatch('updateTransactionImmutable', {
        isImmutable: Boolean(event.target.checked),
        id: event.target.parentElement.dataset.id
      })
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    }
  }
}
</script>
