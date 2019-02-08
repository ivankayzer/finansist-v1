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
      height="550"
      :options="chartOptions"
      :series="series"
      v-if="showReport && type === 'by_category'"
    />
    <apexchart
      type="line"
      height="550"
      :options="chartOptions"
      :series="series"
      v-if="showReport && type === 'by_days'"
    />

    <transactions-table :data="transactions" v-if="transactions.length"></transactions-table>
  </div>
</template>

<style>
  .mb-50 {
    margin-bottom: 50px !important;
  }
</style>


<script>
  import TransactionsTable from '~/components/TransactionsTable'

  export default {
    components: {
      TransactionsTable
    },
    beforeMount() {
      this.$store.dispatch('getDateRangeForReport')
    },
    data() {
      return {
        type: null,
        startDate: null,
        endDate: null,
      }
    },
    methods: {
      formatDate() {
        let startDate = new Date(this.startDate)
        let endDate = new Date(this.endDate)

        startDate = startDate.setHours(startDate.getHours() + 25)
        endDate = endDate.setHours(endDate.getHours() + 25)

        return { startDate: new Date(startDate), endDate: new Date(endDate) }
      },
      generate() {
        let { startDate, endDate } = this.formatDate()

        this.$store.dispatch('generateReport', {
          type: this.type,
          startDate,
          endDate
        })
      }
    },
    computed: {
      dateMin() {
        return this.$store.state.reports.min
      },
      transactions() {
        return this.$store.state.reports.transactions
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
          chart: {
            events: {
              dataPointSelection: (event, chartContext, config) => {
                let { startDate, endDate } = this.formatDate()
                this.$store.dispatch('fetchFilteredTransactions', {
                  category: this.$store.state.reports.keys[config.dataPointIndex],
                  startDate,
                  endDate
                })
              }
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '85%',
              dataLabels: {
                position: 'top'
              }
            }
          },
          dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#304758']
            }
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
