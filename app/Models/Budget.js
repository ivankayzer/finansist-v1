/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Budget extends Model {
  limits() {
    return this.hasMany('App/Models/BudgetLimit');
  }
}

module.exports = Budget;
