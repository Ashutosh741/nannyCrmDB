const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    message: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", BookingSchema)




