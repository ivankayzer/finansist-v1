'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormatterSchema extends Schema {
  up () {
    this.create('formatters', (table) => {
      table.increments()
      table.string('action')
      table.string('match')
      table.json('additional_data')
      table.timestamps()
    })
  }

  down () {
    this.drop('formatters')
  }
}

module.exports = FormatterSchema
