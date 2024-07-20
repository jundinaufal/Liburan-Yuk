const authorization = async (req, res, next) => {
    try {
        const { role } = req.login_info

        // console.log(req.login_info, `login info di adminAuthorization`);

        if (role === 'admin') {
            next()
        } else {
            throw { name: 'Forbidden' }
        }

    } catch (err) {
        console.log(err);
        next(err)
    }
}

module.exports = authorization