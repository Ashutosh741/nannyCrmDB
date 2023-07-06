const jwt = require('jsonwebtoken')


exports.verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({ success: false, message: "you're not authorize" })
    }

    // if token is exist then verify the token

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {
        if (err) {
            return res.status(401).json({ success: false, message: "token is invalid" })
        }
        req.admin = admin
        next() //don't forget to calll next
    })
}

exports.verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.admin.id === req.params.id || req.admin.role === 'admin') {
            next()
        } else {
            return res.status(401).json({ success: false, message: "You're a not authenticate" })
        }
    })
}


exports.verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.admin.role === 'admin') {
            next()
        } else {
            return res.status(401).json({ success: false, message: "You're a not authorize" })
        }
    })
}



