'use strict'

const Formatter = require('../../Services/Formatter')
const Transaction = use('App/Models/Transaction')

class TransactionController {
  async all({ request, auth }) {
    const user = await auth.getUser()
    return this.formatTransactions(
      await user
        .transactions()
        .orderBy('paid_at', 'desc')
        .fetch()
    )
  }

  async getUnformatted({ auth }) {
    const user = await auth.getUser()

    const transactions = await user
      .transactions()
      .unformatted()
      .fetch()

    return transactions
  }

  async filter({ request, auth }) {
    const user = await auth.getUser()
    const { category, startDate, endDate } = request.all()

    let categoryModel = null

    if (category !== 'Без категории') {
      const Category = use('App/Models/Category')
      categoryModel = await Category.query()
        .where('name', category)
        .first()
    }

    let transactions = []

    if (category !== 'Без категории') {
      transactions = await user
        .transactions()
        .expenses()
        .notIgnored()
        .betweenDates(startDate, endDate)
        .where('category_id', categoryModel.id)
        .fetch()
    } else {
      transactions = await user
        .transactions()
        .expenses()
        .notIgnored()
        .betweenDates(startDate, endDate)
        .whereNull('category_id')
        .fetch()
    }

    return transactions
  }

  async format({ auth }) {
    const user = await auth.getUser()
    let transactions = await user
      .transactions()
      .unformatted()
      .fetch()

    const actions = await user.actions().fetch()

    const formattedTransactions = {}

    transactions.toJSON().map(transaction => {
      let formatter = new Formatter(transaction, actions.toJSON())
      transaction = formatter.apply()
      formattedTransactions[transaction.id] = transaction
    })

    for (let index in transactions.rows) {
      const model = transactions.rows[index]
      let { formatted_title, category_id, is_ignored } = formattedTransactions[model.id]
      model.merge({ formatted_title, category_id, is_ignored })
      await model.save()
    }

    return transactions
  }

  async update({ request, params }) {
    const transaction = await Transaction.find(params.id)
    const attributes = request.only(['category_id', 'is_ignored'])

    for (let key in attributes) {
      transaction[key] = attributes[key]
    }

    await transaction.save()

    return this.formatTransaction(transaction)
  }

  async reset({ auth }) {
    const user = await auth.getUser()
    await user
      .transactions()
      .update({ formatted_title: null, category_id: null, is_ignored: false })

    return true
  }

  formatTransactions(transactions) {
    return transactions.rows.map(transaction => this.formatTransaction(transaction))
  }

  formatTransaction(transaction) {
    transaction.is_ignored = Boolean(transaction.is_ignored)

    return transaction
  }
}

module.exports = TransactionController
