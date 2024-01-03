const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { User, Spot, SpotImage, Review } = require('../../db/models')
const router = express.Router()

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id
    const spots = await Spot.findAll({
        where: { ownerId: currentUserId }
    })

    for(const spot of spots) {
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
        if(spotImage instanceof SpotImage) {
            spot.setDataValue('previewImage', spotImage.url)
        }
        else {
            spot.setDataValue('previewImage', null)
        }
    }

    res.json({ Spots: spots })
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    try {
        const { spotId } = req.params
        const spot = await Spot.findByPk(spotId, {
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
        if(!spot) throw new Error("Spot couldn't be found")
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
    }
    catch (error) {
        res.status(404)
        res.json({ message: error.message })
    }
})

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id
        const { spotId } = req.params
        const spot = await Spot.findByPk(spotId)

        if(!spot) {
            const error = new Error("Spot couldn't be found")
            error.statusCode = 404
            throw error
        }
        if(userId !== spot.ownerId) {
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
        if(error.name === 'SequelizeValidationError') {
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
    try {
        const userId = req.user.id
        const { spotId } = req.params
        const spot = await Spot.findByPk(spotId)

        if(!spot) {
            const error = new Error("Spot couldn't be found")
            error.statusCode = 404
            throw error
        }
        if(userId !== spot.ownerId) {
            const error = new Error('Spot must belong to the current user')
            error.statusCode = 400
            throw error
        }

        await spot.destroy()
        res.json({ message: 'Successfully deleted' })
    }
    catch (error) {
        res.status(error.statusCode)
        res.json({ message: error.message })
    }
})

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    for(const spot of spots) {
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
        if(spotImage instanceof SpotImage) {
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
    try {
        const userId = req.user.id
        const { spotId } = req.params
        const spot = await Spot.findByPk(spotId)

        if(!spot) throw new Error("Spot couldn't be found")
        if(spot.ownerId !== userId) throw new Error("Spot must belong to the current user")

        const { url, preview } = req.body
        const newSpotImage = await spot.createSpotImage({
            spotId,
            url,
            preview
        })

        res.json(newSpotImage)
    }
    catch (error) {
        res.status(404)
        res.json({ message: error.message })
    }
})

// Create a Spot
router.post('/', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findByPk(userId)
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const newSpot = await user.createSpot({
            ownerId: userId,
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

        res.status(201)
        res.json(newSpot)
    }
    catch (error) {
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
})

module.exports = router
