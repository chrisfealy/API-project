const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { Review, ReviewImage } = require('../../db/models')
const router = express.Router()

router.delete('/:imageId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)

    if(!reviewImage) {
        return res.status(404).json({ message: "Review Image couldn't be found" })
    }

    const review = await Review.findByPk(reviewImage.reviewId)
    if(userId !== review.userId) {
        return res.status(403).json({ message: "Forbidden" })
    }

    await reviewImage.destroy()

    res.json({ message: "Successfully deleted" })
})

module.exports = router
