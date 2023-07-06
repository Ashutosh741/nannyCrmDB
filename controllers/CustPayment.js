const Customer = require("../models/CustomerReg")
const Payment = require('../models/CustomerPayment')

const createPayment = async (req, res) => {
    const paymentId = req.params.id
    const newPayment = new Payment({ ...req.body })

    try {
        const savedPayment = await newPayment.save()

        // after creating a new review now update the reviews array  of the tour
        await Customer.findByIdAndUpdate(paymentId, {
            $push: { reviews: savedPayment._id }
        })
        res.status(200).json({ success: true, message: 'review Submitted', data: savedPayment })

    } catch (err) {
        res.status(500).json({ success: true, message: 'failed to Submitted' })
    }
}


module.exports = createPayment;