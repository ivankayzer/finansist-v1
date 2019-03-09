/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');

class Action extends Model {
  get jsonFields() {
    return ['additional_data'];
  }

  static boot() {
    super.boot();
    if (Env.get('DB_CONNECTION') === 'mysql') {
      this.addTrait('@provider:Jsonable');
    }
  }
}

module.exports = Action;
