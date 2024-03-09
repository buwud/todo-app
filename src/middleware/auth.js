const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismyproject')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token //authenticate edilen token
        req.user = user
        next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ error: 'Invalid token.' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ error: 'Token has expired.' });
        } else {
            return res.status(401).send({ error: 'Authentication failed.', details: error.message });
        }
    }
}

module.exports = auth