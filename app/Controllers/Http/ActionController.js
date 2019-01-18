'use strict'

class ActionController {
  async all({ request, auth }) {
    const user = await auth.getUser()

    return user
      .actions()
      .orderBy('created_at', 'desc')
      .fetch()
  }

  async add({ request, auth }) {
    const { action } = request.all()
    const uniqId = action.internal_id
    delete action.internal_id

    const user = await auth.getUser()
    const model = await user.actions().create(action)

    return {
      action: model,
      idToReplace: uniqId
    }
  }

  async update({ request, auth, params }) {
    const Action = use('App/Models/Action')
    let action = await Action.find(params.id)
    const attributes = request.only(['action', 'additional_data', 'match'])

    for (let key in attributes) {
      action[key] = attributes[key]
    }

    return await action.save()
  }

  async delete({ request, auth, params }) {
    const Action = use('App/Models/Action')
    const action = await Action.find(params.id)

    action.delete()
  }
}

module.exports = ActionController
