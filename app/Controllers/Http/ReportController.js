'use strict'

class ReportController {
  async dates({ request, auth }) {
    const Database = use('Database')
    const min = await Database.from('transactions').min('paid_at')
    const max = await Database.from('transactions').max('paid_at')

    return {
      min: Object.values(min[0])[0],
      max: Object.values(max[0])[0]
    }
  }
}

module.exports = ReportController
