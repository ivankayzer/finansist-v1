<template>
  <div>
    <h1 class="title">
      Транзакции
      <a class="button is-small is-link is-rounded" @click="add">Добавить новую</a>
      <a class="button is-small is-link is-rounded" @click="format">Форматировать</a>
      <a class="button is-small is-danger is-rounded" @click="reset">Сбросить</a>
      <div class="float-right">
        <a
          :class="['button is-small is-rounded ' + (this.source === 'all' ? 'is-dark' : '')]"
          @click="showAll"
        >Всего: {{ this.$store.state.transactions.transactions.length }}</a>
        <a
          :class="['button is-small is-rounded ' + (this.source === 'unformatted' ? 'is-dark' : '')]"
          @click="showUnformatted"
        >Не отформатированные: {{ this.$store.state.transactions.unformatted.length }}</a>
      </div>
    </h1>
    <section class="new-transaction-section" v-if="showAdd">
      <div class="columns">
        <div class="column is-2">
          <b-field label="Дата">
            <b-datepicker placeholder="Выбери дату" v-model="newTransaction.date"></b-datepicker>
          </b-field>
        </div>
        <div class="column is-5">
          <b-field label="Титул">
            <b-input v-model="newTransaction.title"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Сумма">
            <b-input v-model="newTransaction.amount"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Категория">
            <b-select
              placeholder="Без категории"
              class="mt-15"
              v-model="newTransaction.category_id"
            >
              <option
                v-for="option in categories"
                :value="option.id"
                :key="option.id"
              >{{ option.name }}</option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-1">
          <b-field label="Действия">
            <a class="button is-success" v-if="canBeSaved" @click="save">Добавить</a>
          </b-field>
        </div>
      </div>
    </section>
    <section>
      <transactions-table :data="data"></transactions-table>
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

.new-transaction-section {
  margin: 50px 0;
}
</style>


<script>
import TransactionsTable from "~/components/TransactionsTable";
import daysjs from "dayjs";

export default {
  components: {
    TransactionsTable
  },
  data() {
    return {
      source: "all",
      showAdd: false,
      newTransaction: {
        date: null,
        title: null,
        amount: 0,
        category_id: null
      }
    };
  },
  computed: {
    data() {
      return this.source === "all"
        ? this.$store.state.transactions.transactions
        : this.$store.state.transactions.unformatted;
    },
    categories() {
      return this.$store.getters.categories;
    },
    canBeSaved() {
      return (
        this.newTransaction.date &&
        this.newTransaction.title &&
        this.newTransaction.amount
      );
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchTransactions");
    this.$store.dispatch("fetchUnformatted");
  },
  methods: {
    format() {
      this.$store.dispatch("format");
    },
    showAll() {
      this.source = "all";
    },
    showUnformatted() {
      this.source = "unformatted";
    },
    reset() {
      if (confirm("Ты уверен?")) {
        this.$store.dispatch("reset");
      }
    },
    add() {
      this.showAdd = !this.showAdd;
    },
    save() {
      this.$store
        .dispatch("addNewTransaction", {
          date: daysjs(this.newTransaction.date).format("YYYY-MM-DD"),
          title: this.newTransaction.title,
          amount: this.newTransaction.amount,
          category_id: this.newTransaction.category_id
        })
        .then(response => {
          this.newTransaction = {
            date: null,
            title: null,
            amount: 0,
            category_id: null
          };
          this.showAdd = false;
        });
    }
  }
};
</script>
