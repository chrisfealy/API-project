const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { Review, ReviewImage, Spot } = require('../../db/models')
const router = express.Router()
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

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
    const userId = req.user.id
    const review = await Review.findByPk(req.params.reviewId, {
        include: ReviewImage
    })

    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
    if (userId !== review.userId) {
        return res.status(403).json({ message: "Review must belong to the current user" })
    }

    const reviewImages = review.ReviewImages

    if (reviewImages.length > 10) {
        return res.status(403).json({ message: "Maximum number of images for this resource was reached" })
    }

    const url = req.body.url
    const newReviewImage = await review.createReviewImage({ url })

    res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
})

router.put('/:reviewId', requireAuth, validateReviews, async (req, res) => {
    const userId = req.user.id
    const editReview = await Review.findByPk(req.params.reviewId)

    if (!editReview) {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
    if (userId !== editReview.userId) {
        return res.status(403).json({ message: "Review must belong to the current user" })
    }

    const { review, stars } = req.body

    editReview.review = review || editReview.review
    editReview.stars = stars || editReview.stars

    await editReview.save()
    res.json(editReview)
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
    if (userId !== review.userId) {
        return res.status(403).json({ message: "Review must belong to the current user" })
    }

    await review.destroy()
    res.json({ message: "Successfully deleted" })
})

module.exports = router
