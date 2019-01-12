'use strict'

class UserController {
    async login({ request, auth }) {
        const { username, password } = request.all()

        try {
            await auth.attempt(username, password)
        } catch (error) {
            return 'Missing or invalid jwt token'
        }

        const User = use('App/Models/User')

        const user = await User.query().where('username', username).first();
        const token = await auth.generate(user);

        return {
            user,
            token
        }
    }

    async register({ request, auth }) {
        const { username, password } = request.all()
        const User = use('App/Models/User')
        const user = new User();
        user.username = username;
        user.password = password;
        await user.save();
        const token = await auth.generate(user);

        return {
            user,
            token
        }
    }

    async getUser({ request, auth }) {
        try {
            return await auth.getUser()
        } catch (error) {
            return 'Missing or invalid jwt token'
        }
    }
}

module.exports = UserController
