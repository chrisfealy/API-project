const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { Review, ReviewImage, Spot } = require('../../db/models')
const router = express.Router()

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const reviews = await Review.findAll({
        where: { userId: userId },
        include: [Spot, ReviewImage]
    })
    res.json({ Reviews: reviews })
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id
        const review = await Review.findByPk(req.params.reviewId, {
            include: ReviewImage
        })

        if(!review) {
            const error = new Error("Review couldn't be found")
            error.statusCode = 404
            throw error
        }
        if(userId !== review.userId) {
            const error = new Error('Review must belong to the current user')
            error.statusCode = 400
            throw error
        }

        const reviewImages = review.ReviewImages

        if(reviewImages.length >= 10) {
            const error = new Error('Maximum number of images for this resource was reached')
            error.statusCode = 403
            throw error
        }

        const url = req.body.url
        const newReviewImage = await review.createReviewImage({
            url
        })

        res.json({
            id: newReviewImage.id,
            url: newReviewImage.url
        })
    }
    catch (error) {
        res.status(error.statusCode)
        res.json({ message: error.message })
    }
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id
        const editReview = await Review.findByPk(req.params.reviewId)

        if(!editReview) {
            const error = new Error("Review couldn't be found")
            error.statusCode = 404
            throw error
        }
        if(userId !== editReview.userId) {
            const error = new Error('Review must belong to the current user')
            error.statusCode = 400
            throw error
        }

        const { review, stars } = req.body

        editReview.review = review || editReview.review
        editReview.stars = stars || editReview.stars

        await editReview.save()
        res.json(editReview)
    }
    catch (error) {
        if(error.name === 'SequelizeValidationError') {
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

router.delete('/:reviewId', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id
        const review = await Review.findByPk(req.params.reviewId)

        if(!review) {
            const error = new Error("Review couldn't be found")
            error.statusCode = 404
            throw error
        }
        if(userId !== review.userId) {
            const error = new Error('Review must belong to the current user')
            error.statusCode = 400
            throw error
        }
        await review.destroy()
        res.json({ message: 'Successfully deleted' })
    }
    catch (error) {
        res.status(error.statusCode)
        res.json({ message: error.message })
    }
})

module.exports = router
