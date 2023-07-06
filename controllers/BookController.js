const Booking = require('../models/Booking')


exports.createBookingEntry = async (req, res) => {
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({ success: true, message: 'Successfully created', data: savedBooking })
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ success: false, message: 'URL already exists' })
        } else {
            res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' })
            console.log(err)
        }
    }
}


exports.getAllBooking = async (req, res) => {
    try {
        const entries = await Booking.find();
        res.status(200).json({
            succes: true, count: entries.length, message: "Succesfull", data: entries
        })

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};