'use strict'

class TransactionController {
  async all({ request, auth }) {
    const user = await auth.getUser()
    return this.formatTransactions(await user.transactions().orderBy('paid_at', 'desc').get());
  }

  async update({ request, auth, params }) {
    const Transaction = use('App/Models/Transaction')
    const transaction = await Transaction.find(params.id)
    const attributes = request.only(['category_id', 'is_ignored']);

    for (let key in attributes) {
      transaction[key] = attributes[key];
    }

    await transaction.save()

    return this.formatTransaction(transaction);
  }

  formatTransactions(transactions) {
    return transactions.map(transaction => this.formatTransaction(transaction))
  }

  formatTransaction(transaction) {
    transaction.is_ignored = Boolean(transaction.is_ignored);

    return transaction;
  }
}

module.exports = TransactionController
