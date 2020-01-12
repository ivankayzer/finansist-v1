const Antl = use('Antl');

class UserController {
  async login({ request, auth }) {
    const { username, password } = request.all();

    try {
      await auth.attempt(username, password);
    } catch (error) {
      return Antl.formatMessage('auth.invalid_jwt');
    }

    const User = use('App/Models/User');

    const user = await User.query()
      .where('username', username)
      .first();
    const token = await auth.generate(user);

    return {
      user,
      token,
    };
  }

  async register({ request, auth }) {
    const { username, password } = request.all();
    const User = use('App/Models/User');
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    const token = await auth.generate(user);

    return {
      user,
      token,
    };
  }

  async getUser({ request, auth }) {
    try {
      return await auth.getUser();
    } catch (error) {
      return Antl.formatMessage('auth.invalid_jwt');
    }
  }

  async changeLocale({ request, auth }) {
    const user = await auth.getUser();

    user.language = request.post().locale;
    user.save();
  }
}

module.exports = UserController;
