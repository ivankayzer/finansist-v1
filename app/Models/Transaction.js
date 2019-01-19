'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const currency = require('currency.js')

class Transaction extends Model {
  setAmount(value) {
    if (value) {
      return currency(value.replace(',', '.'), {
        separator: '',
        decimal: '.'
      }).format()
    }
  }

  setPaidAt(value) {
    if (value) {
      let [day, month, year] = value.split('-')
      return new Date(year, parseInt(month) - 1, parseInt(day) + 1)
        .toISOString()
        .slice(0, 10)
    }
  }

  getPaidAt(value) {
    return value.toISOString().slice(0, 10)
  }

  static scopeUnformatted(query) {
    return query
      .whereNull('formatted_title')
      .whereNull('is_ignored')
      .orWhere('is_ignored', 0)
  }

  static scopeExpenses(query) {
    return query.where('amount', '<', 0)
  }

  static scopeNotIgnored(query) {
    return query.where('is_ignored', 0)
  }

  static scopeBetweenDates(query, start, end) {
    return query.whereBetween('paid_at', [
      start.substring(0, 10),
      end.substring(0, 10)
    ])
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  category() {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Transaction
