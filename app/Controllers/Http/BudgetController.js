'use strict'

class BudgetController {
  async add({ request, auth }) {
    const { budget } = request.all()

    const user = await auth.getUser()

    return await user.budgets().create(budget)
  }
}

module.exports = BudgetController
