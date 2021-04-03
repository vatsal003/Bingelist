const express = require('express')
const Bingelist = require('../models/bingelist')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/bingelists', auth, async (req, res) => {
    const bingelist = new Bingelist({
        ...req.body,
        owner: req.user._id
    })

    try {
        await bingelist.save()
        res.status(201).send(bingelist)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/bingelists', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.type) {
        match.typer = req.query.type
    }
    
    if (req.query.name) {
        match.name = req.query.name
    }
    if (req.query.rating) {
        match.rating = req.query.rating
    }
    ///////////////////
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    else{
        /////////
    }

    try {
        await req.user.populate({
            path: 'bingelists',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.bingelists)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/bingelists/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const bingelist = await Bingelist.findOne({ _id, owner: req.user._id })

        if (!bingelist) {
            return res.status(404).send()
        }

        res.send(bingelist)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/bingelists/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['typer', 'rating', 'list_review', 'shared', 'name', 'share_link']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const bingelist = await Bingelist.findOne({ _id: req.params.id, owner: req.user._id})

        if (!bingelist) {
            return res.status(404).send()
        }

        updates.forEach((update) => bingelist[update] = req.body[update])
        await bingelist.save()
        res.send(bingelist)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/bingelists/:id', auth, async (req, res) => {
    try {
        const bingelist = await Bingelist.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!bingelist) {
            res.status(404).send()
        }

        res.send(bingelist)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

////
const videos = await Course.find({ _id })