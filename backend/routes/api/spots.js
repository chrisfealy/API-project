const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models')
const router = express.Router()
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const validateSpots = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat({ min: 0 })
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
]

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id
    const spots = await Spot.findAll({
        where: { ownerId: currentUserId }
    })

    for (const spot of spots) {
        const reviewCount = await Review.count({
            where: { spotId: spot.id }
        })
        const sumRating = await Review.sum('stars', {
            where: { spotId: spot.id }
        })
        const avgRating = (sumRating / reviewCount) || 0
        spot.setDataValue('avgRating', avgRating)

        const spotImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })
        if (spotImage instanceof SpotImage) {
            spot.setDataValue('previewImage', spotImage.url)
        }
        else {
            spot.setDataValue('previewImage', null)
        }
    }

    res.json({ Spots: spots })
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    if (userId !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: { spotId: spot.id },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({ Bookings: bookings })
    }

    const bookings = await Booking.findAll({
        where: { spotId: spot.id },
        include: {
            model: User,
            attributes: {
                exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
            }
        }
    })
    res.json({ Bookings: bookings })
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId, {
        include: Booking
    })

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    if (userId === spot.ownerId) {
        return res.status(403).json({ message: "Spot must NOT belong to the current user" })
    }

    const { startDate, endDate } = req.body

    if (Date.parse(startDate) < Date.now()) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: {
                startDate: 'startDate cannot be in the past'
            }
        })
    }
    if (Date.parse(startDate) >= Date.parse(endDate)) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: {
                endDate: 'endDate cannot be on or before startDate'
            }
        })
    }

    const bookings = spot.Bookings
    for (const booking of bookings) {
        if (Date.parse(startDate) >= Date.parse(booking.startDate) && Date.parse(startDate) <= Date.parse(booking.endDate)) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking"
                }
            })
        }
        if (Date.parse(endDate) >= Date.parse(booking.startDate) && Date.parse(endDate) <= Date.parse(booking.endDate)) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    }

    const newBooking = await spot.createBooking({
        userId,
        startDate,
        endDate
    })

    res.json(newBooking)
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    try {
        const spot = await Spot.findByPk(req.params.spotId, {
            include: Review
        })

        if (!spot) throw new Error("Spot couldn't be found")

        const reviews = spot.Reviews
        for (const review of reviews) {
            const user = await User.findByPk(review.userId, {
                attributes: ['id', 'firstName', 'lastName']
            })
            review.setDataValue('User', user)

            const reviewImages = await ReviewImage.findAll({
                where: { reviewId: review.id },
                attributes: ['id', 'url']
            })
            review.setDataValue('ReviewImages', reviewImages)
        }

        res.json({ Reviews: reviews })
    }
    catch (error) {
        res.status(404)
        res.json({ message: error.message })
    }
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            const error = new Error("Spot couldn't be found")
            error.statusCode = 404
            throw error
        }

        const rev = await Review.findOne({
            where: {
                userId,
                spotId: spot.id
            }
        })
        if (rev) {
            const error = new Error('User already has a review for this spot')
            error.statusCode = 500
            throw error
        }

        const { review, stars } = req.body

        const newReview = await spot.createReview({
            userId,
            review,
            stars
        })

        res.json(newReview)
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            res.status(400)
            res.json({
                message: 'Bad Request',
                errors: {
                    review: 'Review text is required',
                    stars: 'Stars must be an integer from 1 to 5'
                }
            })
        }
        else {
            res.status(error.statusCode)
            res.json({ message: error.message })
        }
    }
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner'
            }
        ]
    })

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    const reviewCount = await Review.count({
        where: { spotId: spot.id }
    })
    const sumRating = await Review.sum('stars', {
        where: { spotId: spot.id }
    })
    const avgRating = sumRating / reviewCount
    spot.setDataValue('numReviews', reviewCount)
    spot.setDataValue('avgStarRating', avgRating)

    res.json(spot)
})

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id
        const { spotId } = req.params
        const spot = await Spot.findByPk(spotId)

        if (!spot) {
            const error = new Error("Spot couldn't be found")
            error.statusCode = 404
            throw error
        }
        if (userId !== spot.ownerId) {
            const error = new Error('Spot must belong to the current user')
            error.statusCode = 400
            throw error
        }

        const { address, city, state, country, lat, lng, name, description, price } = req.body

        spot.address = address || spot.address
        spot.city = city || spot.city
        spot.state = state || spot.state
        spot.country = country || spot.country
        spot.lat = lat || spot.lat
        spot.lng = lng || spot.lng
        spot.name = name || spot.name
        spot.description = description || spot.description
        spot.price = price || spot.price

        await spot.save()
        res.json(spot)
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            res.status(400)
            res.json({
                message: 'Bad Request',
                errors: {
                    address: 'Street address is required',
                    city: 'City is required',
                    state: 'State is required',
                    country: 'Country is required',
                    lat: 'Latitude must be within -90 and 90',
                    lng: 'Longitude must be within -180 and 180',
                    name: 'Name must be less than 50 characters',
                    description: 'Description is required',
                    price: 'Price per day must be a positive number'
                }
            })
        }
        else {
            res.status(error.statusCode)
            res.json({ message: error.message })
        }
    }
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    if (userId !== spot.ownerId) {
        return res.status(404).json({ message: "Spot must belong to the current user" })
    }

    await spot.destroy()
    res.json({ message: 'Successfully deleted' })
})

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    for (const spot of spots) {
        const reviewCount = await Review.count({
            where: { spotId: spot.id }
        })
        const sumRating = await Review.sum('stars', {
            where: { spotId: spot.id }
        })
        const avgRating = (sumRating / reviewCount) || 0
        spot.setDataValue('avgRating', avgRating)

        const spotImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })
        if (spotImage instanceof SpotImage) {
            spot.setDataValue('previewImage', spotImage.url)
        }
        else {
            spot.setDataValue('previewImage', null)
        }
    }

    res.json({ Spots: spots })
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const userId = req.user.id
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    if (userId !== spot.ownerId) {
        return res.status(404).json({ message: "Spot must belong to the current user" })
    }

    const { url, preview } = req.body
    const newSpotImage = await spot.createSpotImage({
        spotId,
        url,
        preview
    })

    res.json(newSpotImage)
})

// Create a Spot
router.post('/', requireAuth, validateSpots, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201).json(newSpot)
})

module.exports = router
