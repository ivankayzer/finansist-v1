'use strict'

const ReportByCategory = require('./ReportByCategory')
const ReportByDays = require('./ReportByDays')
const ReportByCategoryAndDays = require('./ReportByCategoryAndDays')

class ReportFactory {
  static make(type, data) {
    if (type === 'by_category') {
      return new ReportByCategory(data.startDate, data.endDate)
    }

    if (type === 'by_days') {
      return new ReportByDays(data.startDate, data.endDate)
    }

    if (type === 'by_category_and_days') {
      return new ReportByCategoryAndDays(data.startDate, data.endDate)
    }
  }
}

export default ReportFactory
