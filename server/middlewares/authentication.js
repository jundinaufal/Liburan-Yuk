const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    console.log(req.headers, 7)
    console.log(authorization, `authorization di authentication`);
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw { status: 401, message: "Unauthorized" }
    }

    const access_token = authorization.split(' ')[1]

    console.log(access_token, `access token di authentication`);
    try {
      const payload = verifyToken(access_token)
      const user = await User.findByPk(payload.id)

      // console.log(user, `user di authentication` )
      if (!user) {
        throw { status: 401, message: "Unauthorized" }
      }
      // console.log(user.id, user.email, user.role, `data login di authentication`);

      req.login_info = {
        user_id: user.id,
        email: user.email,
        role: user.role
      }
      console.log(req.login_info)

      next()
    } catch (err) {
      console.log(err, 35)
      throw { status: 401, message: "Invalid token" }
    }
  } catch (err) {
    console.log(err, 39)
    next(err)
  }
}

module.exports = authentication