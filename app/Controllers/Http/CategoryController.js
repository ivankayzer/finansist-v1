'use strict'

class CategoryController {
  async all({ request, auth }) {
    const user = await auth.getUser();

    return user.categories().fetch();
  }

  async add({ request, auth }) {
    const { name } = request.all();

    const user = await auth.getUser();

    const category = user.categories().create({ name });

    return category;
  }

  async delete({ request, auth, params }) {
    const Category = use('App/Models/Category');
    const category = await Category.find(params.id);

    category.delete();
  }
}

module.exports = CategoryController
