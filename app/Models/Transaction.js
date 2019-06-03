/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Decimal = require("decimal.js");
const md5 = require("blueimp-md5");

class Transaction extends Model {
  setAmount(value) {
    if (value) {
      return Decimal(value.replace(",", "."))
        .mul(100)
        .toNumber();
    }
  }

  getAmount(value) {
    return value / 100;
  }

  static get dates() {
    return super.dates.concat(["paid_at"]);
  }

  static scopeUnformatted(query) {
    return query.whereNull("category_id").where("is_ignored", 0);
  }

  static scopeExpenses(query) {
    return query.where("amount", "<", 0);
  }

  static scopeIncomes(query) {
    return query.where("amount", ">", 0);
  }

  static scopeNotIgnored(query) {
    return query.where("is_ignored", 0);
  }

  static scopeBetweenDates(query, start, end) {
    return query.whereBetween("paid_at", [
      start.substring(0, 10),
      end.substring(0, 10)
    ]);
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  category() {
    return this.belongsTo("App/Models/Category");
  }

  generateUid() {
    this.uid = md5(this.paid_at + this.original_title + this.amount);
    return this.uid;
  }
}

module.exports = Transaction;
