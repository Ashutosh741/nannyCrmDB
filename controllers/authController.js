const Admin = require('../models/Admin')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {


    try {


        // hashing password

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newAdmin = new Admin({

            email: req.body.email,
            password: hash,

        })

        await newAdmin.save()

        res.status(200).json({ success: true, message: 'successfully created' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'failed to create . try again' })
    }
}


// admin login

exports.login = async (req, res) => {
    const email = req.body.email
    try {
        const admin = await Admin.findOne({ email })

        // if user Doesn't exist
        if (!admin) {
            return res.status(404).json({ success: false, message: 'admin not found' })
        }

        // if user is exisst then check the password or compare the passord

        const checkCorrectPassword = await bcrypt.compare(req.body.password, admin.password)

        // if password is incorrect

        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: "incorrect email or PAssword" })
        }

        const { password, role, ...rest } = admin._doc

        // create jwt token

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET_KEY, { expiresIn: "600d" });

        //set token in the browser cookies and and send the response to the client

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({ token, success: true, message: 'successfully login', data: { ...rest }, role, });


    } catch (err) {
        res.status(500).json({ success: false, message: "failed to login" })
    }
}


