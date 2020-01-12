const Formatter = require("../../Services/Formatter");
const Antl = use('Antl');

const Transaction = use("App/Models/Transaction");

class TransactionController {
  async all({ request, auth }) {
    const user = await auth.getUser();
    return this.formatTransactions(
      await user
        .transactions()
        .orderBy("paid_at", "desc")
        .fetch()
    );
  }

  async getUnformatted({ auth }) {
    const user = await auth.getUser();

    return await user
      .transactions()
      .unformatted()
      .fetch();
  }

  async getIncomes({ auth }) {
    const user = await auth.getUser();

    return await user
      .transactions()
      .incomes()
      .fetch();
  }

  async add({ request, auth }) {
    const user = await auth.getUser();
    const Transaction = use("App/Models/Transaction");
    const transaction = new Transaction();
    const { title, date, amount, category_id } = request.all();

    transaction.original_title = title;
    transaction.paid_at = date.substring(0, 10);
    transaction.amount = amount;
    transaction.category_id = category_id;
    transaction.user_id = user.id;
    transaction.immutable = true;
    transaction.formatted_title = title;

    transaction.generateUid();

    transaction.save();

    return transaction;
  }

  async filterByDay({ request, auth }) {
    const user = await auth.getUser();
    const { date } = request.all();

    return await user
      .transactions()
      .expenses()
      .notIgnored()
      .where("paid_at", date)
      .fetch();
  }

  async filter({ request, auth }) {
    const user = await auth.getUser();
    const { category, startDate, endDate } = request.all();

    let categoryModel = null;

    if (category !== Antl.formatMessage('common.no_category')) {
      const Category = use("App/Models/Category");
      categoryModel = await Category.query()
        .where("name", category)
        .first();
    }

    let transactions = [];

    if (category !== Antl.formatMessage('common.no_category')) {
      transactions = await user
        .transactions()
        .expenses()
        .notIgnored()
        .betweenDates(startDate, endDate)
        .where("category_id", categoryModel.id)
        .fetch();
    } else {
      transactions = await user
        .transactions()
        .expenses()
        .notIgnored()
        .betweenDates(startDate, endDate)
        .whereNull("category_id")
        .fetch();
    }

    return transactions;
  }

  async format({ auth }) {
    const user = await auth.getUser();
    const transactions = await user
      .transactions()
      .unformatted()
      .fetch();

    const actions = await user.actions().fetch();

    const formattedTransactions = {};

    transactions.toJSON().map(transaction => {
      const formatter = new Formatter(transaction, actions.toJSON());
      transaction = formatter.apply();
      formattedTransactions[transaction.id] = transaction;
    });

    for (const index in transactions.rows) {
      const model = transactions.rows[index];
      const {
        formatted_title,
        category_id,
        is_ignored,
        keyword
      } = formattedTransactions[model.id];
      model.merge({ formatted_title, category_id, is_ignored, keyword });
      await model.save();
    }

    return transactions;
  }

  async update({ request, params }) {
    const transaction = await Transaction.find(params.id);
    const attributes = request.only(["category_id", "is_ignored", "immutable"]);

    for (const key in attributes) {
      transaction[key] = attributes[key];
    }

    await transaction.save();

    return this.formatTransaction(transaction);
  }

  async reset({ auth }) {
    const user = await auth.getUser();
    await user
      .transactions()
      .where({ immutable: false })
      .update({ formatted_title: null, category_id: null, is_ignored: false });

    return true;
  }

  formatTransactions(transactions) {
    return transactions.rows.map(transaction =>
      this.formatTransaction(transaction)
    );
  }

  formatTransaction(transaction) {
    transaction.is_ignored = Boolean(transaction.is_ignored);

    return transaction;
  }
}

module.exports = TransactionController;
