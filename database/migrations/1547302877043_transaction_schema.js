'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up() {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('category_id')
      table.boolean('is_ignored')
      table.string('original_title')
      table.string('formatted_title')
      table.date('paid_at')
      table.float('amount')
      table.timestamps()
    })
  }

  down() {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
