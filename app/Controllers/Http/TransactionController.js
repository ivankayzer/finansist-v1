'use strict'

class TransactionController {
  async all({ request, auth }) {
    const user = await auth.getUser()
    return await user.transactions().orderBy('paid_at', 'desc').get()
  }
}

module.exports = TransactionController
