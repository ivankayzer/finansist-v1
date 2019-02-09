'use strict'

class BudgetController {
  async all({ request, auth }) {
    const user = await auth.getUser()

    return user
      .budgets()
      .orderBy('start_date', 'desc')
      .fetch()
  }

  async add({ request, auth }) {
    const { budget } = request.all()

    const uniqId = budget.internal_id
    delete budget.internal_id


    budget.start_date = budget.start_date.slice(0, 10)
    budget.end_date = budget.end_date.slice(0, 10)

    const user = await auth.getUser()

    const model = await user.budgets().create(budget)

    return {
      budget: model,
      idToReplace: uniqId
    }
  }

  async delete({ request, auth, params }) {
    const Budget = use('App/Models/Budget')
    const budget = await Budget.find(params.id)

    budget.delete()
  }
}

module.exports = BudgetController
