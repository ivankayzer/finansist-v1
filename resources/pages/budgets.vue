<template>
  <section>
    <h1 class="title">Бюджеты</h1>
    <a class="button is-link is-rounded my-15" @click="addNew">Добавить новый</a>
    <div class="budget" v-for="budget in budgets">
      <div class="columns">
        <div class="column">
          <b-field label="Дата начала">
            <b-datepicker
              placeholder="Выбери дату"
              v-model="budget.start_date"
            ></b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Дата конца">
            <b-datepicker
              placeholder="Выбери дату"
              v-model="budget.end_date"
            ></b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Лимит">
            <b-input
              type="number"
              v-model="budget.limit"
            >
            </b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Категория">
            <b-select
              placeholder="Без категории"
              class="mt-15"
              v-model="budget.category_id"
            >
              <option
                v-for="option in categories"
                :value="option.id"
                :key="option.id"
              >{{ option.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <a
            class="button is-success mt-30"
            v-if="canBeSaved(budget)"
            @click="save(budget)"
          >Сохранить</a>
        </div>
      </div>
    </div>
    <div class="columns mt-30">
      <div class="column is-4" v-for="card in budgetsList">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ formatDate(card.start_date) }} - {{ formatDate(card.end_date) }}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click="confirm(card.id)">
              Удалить
            </a>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  .budget {
    margin-top: 30px;
  }

  .mt-30 {
    margin-top: 30px;
  }
</style>

<script>
  import { generatesId } from '../store/mixins'
  import daysjs from 'dayjs'
  import 'dayjs/locale/ru'

  export default {
    data() {
      return {
        budgets: []
      }
    },
    computed: {
      categories() {
        return this.$store.getters.categories
      },
      budgetsList() {
        return this.$store.state.budgets.budgets;
      }
    },
    beforeMount() {
      this.$store.dispatch('fetchBudgets')
      this.$store.dispatch('getCategories')
    },
    methods: {
      formatDate(date) {
        return daysjs(date).locale('ru').format('DD MMM, YYYY');
      },
      confirm(id) {
        this.$dialog.confirm({
          type: 'is-danger',
          message: 'Точно удалить?',
          cancelText: 'Нет',
          confirmText: 'Да',
          onConfirm: () => this.$store.dispatch('deleteBudget', id)
        })
      },
      addNew() {
        this.budgets.unshift({
          internal_id: this.generateId(),
          start_date: null,
          end_date: null,
          category_id: null,
          limit: null
        })
      },
      canBeSaved(budget) {
        return budget.start_date && budget.end_date && budget.category_id && budget.limit;
      },
      save(budget) {
        this.$store.dispatch('saveBudget', budget).then(() => {
          this.budgets = this.budgets.filter(b => b.internal_id !== budget.internal_id)
        });
      }
    },
    mixins: [generatesId]
  }
</script>
