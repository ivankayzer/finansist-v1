'use strict'

const Formatter = require('../../Services/Formatter')

class TransactionController {
  async all({ request, auth }) {
    const user = await auth.getUser()
    return this.formatTransactions(
      await user
        .transactions()
        .orderBy('paid_at', 'desc')
        .get()
    )
  }

  async getUnformattedCount({ auth }) {
    const user = await auth.getUser()
    const count = await user
      .transactions()
      .unformatted()
      .count('id')

    return {
      count: Object.values(count[0])[0]
    }
  }

  async format({ auth }) {
    const user = await auth.getUser()
    let transactions = await user
      .transactions()
      .unformatted()
      .fetch()

    const actions = await user.actions().fetch()

    const formattedTransactions = {}

    const output = transactions.toJSON().map(transaction => {
      let formatter = new Formatter(transaction, actions.toJSON())
      transaction = formatter.apply()
      formattedTransactions[transaction.id] = transaction
    })

    for (let index in transactions.rows) {
      const model = transactions.rows[index]
      let { formatted_title, category_id, is_ignored } = formattedTransactions[
        model.id
      ]
      model.merge({ formatted_title, category_id, is_ignored })
      await model.save()
    }

    return {
      transactions: output
    }
  }

  async update({ request, params }) {
    const Transaction = use('App/Models/Transaction')
    const transaction = await Transaction.find(params.id)
    const attributes = request.only(['category_id', 'is_ignored'])

    for (let key in attributes) {
      transaction[key] = attributes[key]
    }

    await transaction.save()

    return this.formatTransaction(transaction)
  }

  formatTransactions(transactions) {
    return transactions.map(transaction => this.formatTransaction(transaction))
  }

  formatTransaction(transaction) {
    transaction.is_ignored = Boolean(transaction.is_ignored)

    return transaction
  }
}

module.exports = TransactionController
