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
        <b-radio
          v-model="type"
          type="is-dark"
          native-value="by_category_and_days"
        >По категории и дням</b-radio>
      </div>
    </div>

    <div class="columns mb-50" v-show="showGenerateButton">
      <div class="column">
        <a class="button is-link is-rounded" @click="generate">Сгенерировать</a>
      </div>
    </div>

    <apexchart type="bar" height="350" :options="chartOptions" :series="series"/>
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
      endDate: null,
      series: [
        {
          name: 'Потрачено',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }
      ],
      chartOptions: {
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
          categories: [
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct'
          ]
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
  },
  methods: {
    generate() {
      this.$store.dispatch('generateReport', {
        type: this.type,
        startDate: this.startDate,
        endDate: this.endDate
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
    }
  }
}
</script>
