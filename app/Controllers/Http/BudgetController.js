const dayjs = require('dayjs');
const collect = require('collect.js');

class BudgetController {
  async all({ request, auth }) {
    const user = await auth.getUser();

    let budgets = await user
      .budgets()
      .orderBy('start_date', 'desc')
      .with('limits')
      .fetch();

    budgets = budgets.toJSON();

    for (const key in budgets) {
      const budget = budgets[key];

      let transactions = await user
        .transactions()
        .expenses()
        .notIgnored()
        .betweenDates(
          dayjs(budget.start_date).format(),
          dayjs(budget.end_date).format()
        )
        .fetch();

      transactions = this.aggregateTransactions(transactions.toJSON());

      budget.limits = budget.limits.map(limit => {
        limit.expenses = transactions.get(limit.category_id);
        return limit;
      });

      budgets[key] = budget;
    }

    return budgets;
  }

  async add({ request, auth }) {
    const { budget } = request.all();
    const uniqId = budget.internal_id;
    const user = await auth.getUser();

    const model = await user.budgets().create({
      start_date: budget.start_date.slice(0, 10),
      end_date: budget.end_date.slice(0, 10),
    });

    budget.data.forEach(async limit => {
      await model.limits().create(limit);
    });

    return {
      budget: model,
      idToReplace: uniqId,
    };
  }

  async delete({ request, auth, params }) {
    const Budget = use('App/Models/Budget');
    const budget = await Budget.find(params.id);

    budget.delete();
  }

  aggregateTransactions(transactions) {
    return collect(transactions)
      .groupBy('category_id')
      .map(group => group.sum('amount'));
  }
}

module.exports = BudgetController;
