<template>
  <div>
    <h1 class="title">
      {{ $t('common.transactions') }}
      <a class="button is-small is-link is-rounded" @click="add">{{ $t('transactions.add_new') }}</a>
      <a class="button is-small is-link is-rounded" @click="format">{{ $t('transactions.do_format') }}</a>
      <a class="button is-small is-danger is-rounded" @click="reset">{{ $t('transactions.reset') }}</a>
      <div class="float-right">
        <a
          :class="['button is-small is-rounded ' + (this.source === 'all' ? 'is-dark' : '')]"
          @click="showAll"
        >{{ $t('transactions.total') }}: {{ this.$store.state.transactions.transactions.length }}</a>
        <a
          :class="['button is-small is-rounded ' + (this.source === 'unformatted' ? 'is-dark' : '')]"
          @click="showUnformatted"
        >{{ $t('transactions.not_formatted') }}: {{ this.$store.state.transactions.unformatted.length }}</a>
        <a
          :class="['button is-small is-rounded ' + (this.source === 'incomes' ? 'is-dark' : '')]"
          @click="showIncomes"
        >{{ $t('transactions.income') }}: {{ this.$store.state.transactions.incomes.length }}</a>
      </div>
    </h1>
    <section class="new-transaction-section" v-if="showAdd">
      <div class="columns">
        <div class="column is-2">
          <b-field :label="$t('transactions.date')">
            <b-datepicker :placeholder="$t('common.select_date')" v-model="newTransaction.date"></b-datepicker>
          </b-field>
        </div>
        <div class="column is-5">
          <b-field :label="$t('transactions.title')">
            <b-input v-model="newTransaction.title"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field :label="$t('transactions.sum')">
            <b-input v-model="newTransaction.amount"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field :label="$t('common.category')">
            <b-select
              :placeholder="$t('common.no_category')"
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
          <b-field :label="$t('transactions.actions')">
            <a class="button is-success" v-if="canBeSaved" @click="save">{{ $t('transactions.add') }}</a>
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
      let transactions = this.$store.state.transactions;
      switch (this.source) {
        case "unformatted":
          return transactions.unformatted;
        case "incomes":
          return transactions.incomes;
        default:
          return transactions.transactions;
      }
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
    this.$store.dispatch("fetchIncomes");
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
    showIncomes() {
      this.source = "incomes";
    },
    reset() {
      if (confirm($t('transactions.are_you_sure'))) {
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
