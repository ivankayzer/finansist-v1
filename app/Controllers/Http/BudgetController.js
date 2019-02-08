'use strict'

class BudgetController {
  async add({ request, auth }) {
    const { budget } = request.all()

    const user = await auth.getUser()
    const model = await user.budgets().create(budget)

    return model
  }
}

module.exports = BudgetController
