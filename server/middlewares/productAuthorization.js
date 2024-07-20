const { User, Product } = require('../models')

const authorization = async (req, res, next) => {
    try {
        const { id, role } = req.loginInfo

        // console.log(req.loginInfo, `<<< role di authorization`);
        if (role === 'Staff') {

            const user = await User.findByPk(id)

            if(!user) throw { name: "Forbidden"}

            const product = await Product.findByPk(id)

            if(!product) throw { name: "NotFound"}

            if (product.authorId !== user.id) throw { name: "Forbidden"}
        }

        next()
    } catch (err) {
        console.log(err);
        next(err)
    }
}

module.exports = authorization