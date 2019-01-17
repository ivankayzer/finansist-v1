'use strict'

class ActionController {
  async all({ request, auth }) {
    const user = await auth.getUser()

    return user.actions().fetch()
  }

  async add({ request, auth }) {
    const { action } = request.all()
    const uniqId = action.internal_id
    delete action.internal_id

    const user = await auth.getUser()

    return {
      action: user.actions().create(action),
      idToReplace: uniqId
    }
  }

  async update({ request, auth, params }) {

  }

  async delete({ request, auth, params }) {
    const Action = use('App/Models/Action')
    const action = await Action.find(params.id)

    action.delete()
  }
}

module.exports = ActionController
