<template>
  <section>
    <h1 class="title">Бюджеты</h1>
    <a class="button is-link is-rounded my-15" @click="addNew">Добавить новый</a>
    <div class="budget" v-for="budget in budgets">
      <div class="columns">
        <div class="column is-half">
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
          </div>
        </div>
        <div class="column is-half">
          <div class="columns flex-wrap">
            <div class="column relative is-12" v-for="(data, index) in budget.data">
              <div class="columns">
                <div class="column">
                  <b-field label="Лимит">
                    <b-input
                      type="number"
                      v-model="data.limit"
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Категория">
                    <b-select
                      placeholder="Без категории"
                      class="mt-15"
                      v-model="data.category_id"
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
              </div>
              <a class="delete add-row" @click="addLimit(budget)"></a>
              <a class="delete remove-row" v-if="budget.data.length > 1" @click="removeLimit(budget, index)"></a>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <a
            class="button is-success"
            v-if="canBeSaved(budget)"
            @click="save(budget)"
          >Сохранить</a>
        </div>
      </div>
    </div>
    <div class="columns mt-30">
      <budget-card v-for="card in budgetsList" :card="card" :key="card.id" />
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

  .relative {
    position: relative;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .add-row {
    position: absolute;
    transform: rotate(45deg);
    bottom: 45px;
    right: 15px;
  }

  .remove-row {
    position: absolute;
    transform: rotate(45deg);
    bottom: 45px;
    right: 45px;
  }

  .remove-row:before {
    content: none;
  }
</style>

<script>
  import BudgetCard from '../components/BudgetCard'
  import { generatesId } from '../store/mixins'
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
        return this.$store.state.budgets.budgets
      }
    },
    beforeMount() {
      this.$store.dispatch('fetchBudgets')
      this.$store.dispatch('getCategories')
    },
    methods: {
      addNew() {
        this.budgets.unshift({
          internal_id: this.generateId(),
          start_date: null,
          end_date: null,
          data: [{
            category_id: null,
            limit: null
          }]
        })
      },
      canBeSaved(budget) {
        return budget.start_date && budget.end_date && budget.data.filter(data => data.category_id && data.limit).length
      },
      addLimit(budget) {
        budget.data.push({
          category_id: null,
          limit: null
        })
      },
      removeLimit(budget, index) {
        budget.data.splice(index, 1)
      },
      save(budget) {
        this.$store.dispatch('saveBudget', budget).then(() => {
          this.budgets = this.budgets.filter(b => b.internal_id !== budget.internal_id)
        })
      }
    },
    mixins: [generatesId],
    components: {
      BudgetCard
    }
  }
</script>
