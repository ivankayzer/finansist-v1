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
              v-model="budget.dateStart"
            ></b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Дата конца">
            <b-datepicker
              placeholder="Выбери дату"
              v-model="budget.dateEnd"
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
  export default {
    data() {
      return {
        budgets: []
      }
    },
    computed: {
      categories() {
        return this.$store.getters.categories
      }
    },
    beforeMount() {
      this.$store.dispatch('getCategories')
    },
    methods: {
      addNew() {
        this.budgets.unshift({
          dateStart: null,
          dateEnd: null,
          category_id: null,
          limit: null
        })
      },
      canBeSaved(budget) {
        return budget.dateStart && budget.dateEnd && budget.category_id && budget.limit;
      },
      save(budget) {
        this.$store.dispatch('saveBudget');
      }
    }
  }
</script>
