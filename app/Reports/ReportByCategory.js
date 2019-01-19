'use strict'

const Report = require('./Report')
const collect = require('collect.js')

class ReportByCategory extends Report {
  async generate() {
    let transactions = await this._transactions
      .expenses()
      .notIgnored()
      .betweenDates(this._start, this._end)
      .with('category')
      .fetch()

    transactions = collect(transactions.toJSON())
      .groupBy('category_id')
      .mapWithKeys(group => {
        let firstItem = group.items[0]
        let categoryName = firstItem.category_id
          ? firstItem.category.name
          : 'Без категории'
        return [categoryName, group]
      })
      .map(group => Math.abs(group.sum('amount').toFixed(2)))

    return {
      keys: transactions.keys().toArray(),
      values: transactions.values().toArray()
    }
  }
}

module.exports = ReportByCategory
