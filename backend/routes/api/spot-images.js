const express = require('express')
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage } = require('../../db/models')
const router = express.Router()

router.delete('/:imageId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spotImage = await SpotImage.findByPk(req.params.imageId)

    if(!spotImage) {
        return res.status(404).json({ message: "Spot Image couldn't be found" })
    }

    const spot = await Spot.findByPk(spotImage.spotId)
    if(userId !== spot.ownerId) {
        return res.status(403).json({ message: "Spot must belong to the current user" })
    }

    await spotImage.destroy()

    res.json({ message: "Successfully deleted" })
})

module.exports = router
