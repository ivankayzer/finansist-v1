'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const currency = require('currency.js')

class Transaction extends Model {
  setAmount(value) {
    if (value) {
      return currency(value.replace(',', '.'), { separator: "", decimal: "."}).format()
    }
  }

  setPaidAt(value) {
    if (value) {
      let [day, month, year] = value.split('/');
      return new Date(year, parseInt(month) - 1, parseInt(day) + 1).toISOString().slice(0, 10);
    }
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  category() {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Transaction
