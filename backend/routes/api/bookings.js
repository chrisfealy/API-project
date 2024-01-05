const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { Booking, Spot, SpotImage } = require('../../db/models')
const router = express.Router()
const { Op } = require("sequelize")

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const bookings = await Booking.findAll({
        where: { userId },
        include: {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }
    })

    for (const booking of bookings) {
        const spot = booking.Spot
        const spotImg = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })
        spot.setDataValue('previewImage', spotImg.url)
    }

    res.json({ Bookings: bookings })
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }
    if (userId !== booking.userId) {
        return res.status(403).json({ message: "Booking must belong to the current user" })
    }
    if (Date.parse(booking.endDate) < Date.now()) {
        return res.status(403).json({ message: "Past bookings can't be modified" })
    }

    const { startDate, endDate } = req.body

    if(Date.parse(startDate) < Date.now()) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "startDate cannot be in the past"
            }
        })
    }
    if (Date.parse(startDate) > Date.parse(endDate)) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }

    const bookingConflict = await Booking.findOne({
        where: {
            id: { [Op.ne]: booking.id },
            spotId: booking.spotId,
            [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },
                { endDate: { [Op.between]: [startDate, endDate] } },
            ]
        }
    })

    if (bookingConflict) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }

    booking.startDate = startDate || booking.startDate
    booking.endDate = endDate || booking.endDate

    await booking.save()
    res.json(booking)
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }
    if (userId !== booking.userId) {
        return res.status(403).json({ message: "Booking must belong to the current user" })
    }
    if (Date.parse(booking.startDate) < Date.now()) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" })
    }

    await booking.destroy()
    res.json({ message: "Successfully deleted" })
})

module.exports = router
