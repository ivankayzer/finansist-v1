<template>
  <div>
    <div class="columns">
      <div class="column is-half">
        <b-field label="Дата начала">
          <b-datepicker
            placeholder="Выбери дату"
            v-model="startDate"
            :min-date="dateMin"
            :max-date="dateMax"
          ></b-datepicker>
        </b-field>
      </div>
      <div class="column is-half">
        <b-field label="Дата конца">
          <b-datepicker
            placeholder="Выбери дату"
            v-model="endDate"
            :min-date="dateMin"
            :max-date="dateMax"
          ></b-datepicker>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-radio v-model="type" type="is-dark" native-value="by_category">По категории</b-radio>
        <b-radio v-model="type" type="is-dark" native-value="by_days">По дням</b-radio>
      </div>
    </div>

    <div class="columns mb-50" v-show="showGenerateButton">
      <div class="column">
        <a class="button is-link is-rounded" @click="generate">Сгенерировать</a>
      </div>
    </div>

    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
      v-if="showReport && type === 'by_category'"
    />
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
      v-if="showReport && type === 'by_days'"
    />
  </div>
</template>

<style>
.mb-50 {
  margin-bottom: 50px !important;
}
</style>


<script>
export default {
  beforeMount() {
    this.$store.dispatch('getDateRangeForReport')
  },
  data() {
    return {
      type: null,
      startDate: null,
      endDate: null
    }
  },
  methods: {
    generate() {
      let startDate = new Date(this.startDate)
      let endDate = new Date(this.endDate)

      startDate = startDate.setHours(startDate.getHours() + 25)
      endDate = endDate.setHours(endDate.getHours() + 25)

      this.$store.dispatch('generateReport', {
        type: this.type,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      })
    }
  },
  computed: {
    dateMin() {
      return this.$store.state.reports.min
    },
    dateMax() {
      return this.$store.state.reports.max
    },
    showGenerateButton() {
      return this.startDate && this.endDate && this.type
    },
    showReport() {
      return (
        this.$store.state.reports.keys.length &&
        this.$store.state.reports.values.length
      )
    },
    series() {
      return [
        {
          name: 'Потрачено',
          data: this.$store.state.reports.values
        }
      ]
    },
    chartOptions() {
      return {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%'
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: this.$store.state.reports.keys
        },
        yaxis: {
          title: {
            text: 'PLN'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + ' PLN'
            }
          }
        }
      }
    }
  }
}
</script>
