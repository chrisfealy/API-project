const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models')
const router = express.Router()
const { Op } = require("sequelize")
const { check, query } = require('express-validator')
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

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

const validateQuery = [
    query('page')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Page must be greater than or equal to 1'),
    query('size')
        .optional()
        .isInt({ min: 1, max: 20 })
        .withMessage('Size must be greater than or equal to 1'),
    query('maxLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Maximum latitude is invalid'),
    query('minLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Minimum latitude is invalid'),
    query('maxLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Maximum longitude is invalid'),
    query('minLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Minimum longitude is invalid'),
    query('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    query('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
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
    const spot = await Spot.findByPk(req.params.spotId, {
        include: Review
    })

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

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
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReviews, async (req, res) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    const rev = await Review.findOne({
        where: {
            userId,
            spotId: spot.id
        }
    })
    if (rev) {
        return res.status(500).json({ message: "User already has a review for this spot" })
    }

    const { review, stars } = req.body

    const newReview = await spot.createReview({
        userId,
        review,
        stars
    })

    res.json(newReview)
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
                attributes: ['id', 'firstName', 'lastName'],
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
router.put('/:spotId', requireAuth, validateSpots, async (req, res) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    if (userId !== spot.ownerId) {
        return res.status(403).json({ message: "Spot must belong to the current user" })
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
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    if (userId !== spot.ownerId) {
        return res.status(403).json({ message: "Spot must belong to the current user" })
    }

    await spot.destroy()
    res.json({ message: "Successfully deleted" })
})

// Get all Spots
router.get('/', validateQuery, async (req, res) => {
    let { size, page, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    if(!size) size = 20
    page = page || 1

    const queryObj = { where: {} }
    const pagination = {
        limit: size,
        offset: size * (page - 1)
    }

    if(minLat) {
        queryObj.where.lat = { [Op.gte]: minLat }
    }
    if(maxLat) {
        queryObj.where.lat = { ...queryObj.where.lat, [Op.lte]: maxLat }
    }
    if(minLng) {
        queryObj.where.lng = { [Op.gte]: minLng }
    }
    if(maxLng) {
        queryObj.where.lng = { ...queryObj.where.lng, [Op.lte]: maxLng }
    }
    if(minPrice) {
        queryObj.where.price = { [Op.gte]: minPrice }
    }
    if(maxPrice) {
        queryObj.where.price = { ...queryObj.where.price, [Op.lte]: maxPrice }
    }


    const spots = await Spot.findAll({...queryObj, ...pagination})

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

    res.json({
        Spots: spots,
        page,
        size
    })
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

    res.json({
        id: newSpotImage.id,
        url: newSpotImage.url,
        preview: newSpotImage.preview
    })
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
