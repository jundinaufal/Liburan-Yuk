const { User } = require('../models')
const { comparePassword, hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');


class Controller {

    static async googleLogin(req, res, next) {
        try {
            const { token } = req.headers
            // console.log(token, `ini token`);
            const client = new OAuth2Client()

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "1085227718228-66s4is2p1n4jjo33n8eqmo473qkrfe00.apps.googleusercontent.com",
            });

            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    email: payload.email,
                    password: "password_google",
                    phoneNumber: "none",
                    address: "none"
                },
                hooks: false
            })

            const access_token = signToken({
                id: user.id,
                username: user.username,
            })

            res.status(200).json({ access_token })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const user = await User.create({ username, email, password, role: 'user', phoneNumber, address })

            res.status(201).json({
                message: "Success create new user",
                user
            })
        } catch (error) {
            // console.log(err, `error di register controller`);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) throw { name: "InvalidLogin" }

            // proses nyari user bedasarkan email
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) throw { name: "LoginError" }

            const validPassword = comparePassword(password, user.password)

            if (!validPassword) throw { name: "LoginError" }

            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }

            const access_token = signToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (error) {
            // console.log(err, `error di login controller`);
            next(error)
        }
    }

    static async showAllUsers(req, res, next) {
        try {
            const users = await User.findAll()

            res.status(200).json({
                users
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async showUserById(req, res, next) {
        try {
            const { id } = req.params
            // console.log(id);

            const user = await User.findByPk(id)

            if (!user) {
                throw ({ name: "NotFound", id })
            }

            res.status(200).json({
                message: `Success read user with id ${user.id}`,
                user
            })

        } catch (error) {
            // console.log(error, `error di user by id`);
            next(error)
        }
    }

    static async editUser(req, res, next) {
        try {
            const { id } = req.params
            let user = await User.findByPk(id)

            if (!user) {
                throw ({ name: "NotFound", id })
            }

            let { username, email, password, role, phoneNumber, address } = req.body

            password = hashPassword(password)

            await User.update({ username, email, password, role, phoneNumber, address }, {
                where: {
                    id
                }
            })

            user = await User.findByPk(id)

            res.status(200).json({
                message: `Success edit user with id ${id}`,
                user
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params

            const user = await User.findByPk(id)

            if (!user) {
                throw ({ name: "NotFound", id })
            }

            await User.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({
                message: `Success delete user with id ${id}`
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = Controller