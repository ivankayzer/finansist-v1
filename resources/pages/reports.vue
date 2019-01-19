<template>
  <div>
    <b-field label="Select a date">
      <b-datepicker placeholder="Click to select..." :min-date="dateMin" :max-date="dateMax"></b-datepicker>
    </b-field>

    <b-field label="Select a date">
      <b-datepicker placeholder="Click to select..." :min-date="dateMin" :max-date="dateMax"></b-datepicker>
    </b-field>

    <apexchart type="bar" height="350" :options="chartOptions" :series="series"/>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch('getDateRangeForReport')
  },
  data() {
    return {
      series: [
        {
          name: 'Титул',
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
  computed: {
    dateMin() {
      return this.$store.state.reports.min
    },
    dateMax() {
      return this.$store.state.reports.max
    }
  }
}
</script>
