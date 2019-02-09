'use strict'

const { Command } = require('@adonisjs/ace')
const Database = use('Database')
const Transaction = use('App/Models/Transaction')

class GenerateUid extends Command {
  static get signature () {
    return 'generate:uid'
  }

  static get description () {
    return 'Generate uids for transactions with empty uid'
  }

  async handle (args, options) {
    let transactions = await Transaction.query().whereNull('uid').fetch()

    transactions.rows.forEach(async transaction => {
      transaction.generateUid();
      await transaction.save();
    })

    Database.close()

    return true;
  }
}

module.exports = GenerateUid
