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
</style>


<script>
import TransactionsTable from "~/components/TransactionsTable";

export default {
  components: {
    TransactionsTable
  },
  data() {
    return {
      source: "all",
      showAdd: false
    };
  },
  computed: {
    data() {
      return this.source === "all"
        ? this.$store.state.transactions.transactions
        : this.$store.state.transactions.unformatted;
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
    }
  }
};
</script>
