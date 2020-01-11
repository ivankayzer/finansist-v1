<template>
  <div class="column is-4">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title"
        >{{ formatDate(card.start_date) }} - {{ formatDate(card.end_date) }}.</p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="limit-container" :key="index" v-for="(limit, index) in card.limits">
            <div class="limit-label">
              <a
                href="#"
                @click="getTransactions(limit.category_id)"
              >{{ getCategoryById(limit.category_id).name }}</a>
            </div>
            <div class="limit" :data-id="card.id + '-' + index"></div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <p>{{ $t('budgets.expected') }}: {{ card.sum }}</p>
          <p>{{ $t('budgets.spent') }}: {{ Math.abs(card.sumExpenses) }}</p>
        </div>
        <a href="#" class="card-footer-item" @click="confirm(card.id)">{{ $t('common.delete') }}</a>
      </footer>
    </div>
  </div>
</template>

<style>
.limit-container {
  position: relative;
}

.card-footer-item {
  display: flex;
  flex-direction: column;
}

.progressbar-text {
  width: 100%;
  text-align: right;
}

.progress-info {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>

<script>
import daysjs from "dayjs";
import ProgressBar from "progressbar.js";

export default {
  props: ["card"],
  methods: {
    formatDate(date) {
      return daysjs(date)
        .locale("ru")
        .format("DD MMM, YYYY");
    },
    getTransactions(category_id) {
      let startDate = daysjs(this.card.start_date).format("YYYY-MM-DD");
      let endDate = daysjs(this.card.end_date).format("YYYY-MM-DD");

      this.$store.dispatch("fetchFilteredTransactions", {
        category: this.getCategoryById(category_id).name,
        startDate,
        endDate
      });
    },
    confirm(id) {
      this.$dialog.confirm({
        type: "is-danger",
        message: "Точно удалить?",
        cancelText: "Нет",
        confirmText: "Да",
        onConfirm: () => this.$store.dispatch("deleteBudget", id)
      });
    },
    getCategoryById(id) {
      return this.categories.filter(category => category.id === id).pop();
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    }
  },
  mounted() {
    this.card.limits.forEach((limit, index) => {
      let value =
        Number(limit.limit) === 0
          ? 0
          : (Math.abs(Number(limit.expenses)) / Number(limit.limit)) * 100;
      new ProgressBar.Line(`[data-id="${this.card.id + "-" + index}"]`, {
        strokeWidth: 4,
        easing: "easeInOut",
        duration: 1400,
        color: "#FFEA82",
        trailColor: "#eee",
        trailWidth: 4,
        svgStyle: { width: "100%", height: "100%" },
        text: {
          style: {
            color: "#999",
            position: "absolute",
            right: "0",
            top: "30px",
            padding: 0,
            margin: 0,
            transform: null
          },
          autoStyleContainer: false
        },
        from: { color: "#FFEA82" },
        to: { color: "#FFEA82" },
        step: (state, bar) => {
          bar.setText(
            '<span class="progress-info">' +
              Math.abs(Number(limit.expenses)).toFixed(2) +
              " / " +
              Number(limit.limit) +
              " " +
              "</span><b>" +
              Math.round(value) +
              " %" +
              "</b>"
          );
          if (bar.value() > 1) {
            bar.trail.setAttribute("stroke", "#FFEA82");
          }
        }
      }).animate(value / 100);
    });
  }
};
</script>
