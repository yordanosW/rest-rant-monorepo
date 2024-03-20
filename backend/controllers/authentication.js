const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {

    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ message: `Could not find a user with the provided username and password` })
    } else {
        req.session.userId = user.userId
        res.json({ user })
    }
})

router.get('/profile', async (req, res) => {
    req.json(req.currentUser)
    try {
        let user = await User.findOne({
            where: { userId: req.session.userId }
        })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.json(null)
    }
})
router.post('/:placeId/comments', async (req, res) => {
    const placeId = Number(req.params.placeId)

    req.body.rant = req.body.rant ? true : false

    const place = await Place.findOne({
        where: { placeId: placeId }
    })

    if (!place) {
        res.status(404).json({ message: `Could not find place with id "${placeId}"` })
    }

    if (!req.currentUser) {
        return res.status(404).json({
            message: 'You must be logged in to post a rant or rave.'
        })
    }

    const comment = await Comment.create({
        ...req.body,
        placeId: placeId,
        authorId: currentUser.userId
    })

    res.send({
        ...comment.toJSON(),
        author: req.currentUser
    })
})
module.exports = router
