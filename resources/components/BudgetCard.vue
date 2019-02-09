<template>
  <div class="column is-4">
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
          <div class="limit-container" v-for="(limit, index) in card.limits">
            <div class="limit-label">
                {{ getCategoryById(limit.category_id).name }}
            </div>
            <div class="limit" :data-id="index"></div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" @click="confirm(card.id)">
          Удалить
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
  import daysjs from 'dayjs'
  import ProgressBar from 'progressbar.js'

  export default {
    props: ['card'],
    methods: {
      formatDate(date) {
        return daysjs(date).locale('ru').format('DD MMM, YYYY')
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
      getCategoryById(id) {
        return this.categories.filter(category => category.id === id).pop()
      }
    },
    computed: {
      categories() {
        return this.$store.getters.categories
      },
    },
    mounted() {
      this.card.limits.forEach((limit, index) => {
        new ProgressBar.Line(`[data-id="${index}"]`, {easing: 'easeInOut'}).animate(1);
      });
    }
  }
</script>
