'use strict'

const Report = require('./Report')
const collect = require('collect.js')

class ReportByDays extends Report {
  async generate() {
    let transactions = await this._transactions
      .expenses()
      .notIgnored()
      .betweenDates(this._start, this._end)
      .with('category')
      .orderBy('paid_at')
      .fetch()

    transactions = collect(transactions.toJSON())
      .groupBy('paid_at')
      .map(group => Math.abs(group.sum('amount').toFixed(2)))

    return {
      keys: transactions.keys().toArray(),
      values: transactions.values().toArray()
    }
  }
}

module.exports = ReportByDays
