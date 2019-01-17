'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Action extends Model {
  get jsonFields() {
    return ['additional_data']
  }

  static boot() {
    super.boot()
    this.addTrait('@provider:Jsonable')
  }
}

module.exports = Action
