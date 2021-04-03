const express = require('express')
const Bingenote = require('../models/bingenote')
const auth = require('../middleware/auth')
const router = new express.Router()
const get_list = require('../middleware/get_list')

router.post('/bingenotes', auth, get_list, async (req, res) => {
    const bingenote = new Bingenote({
        ...req.body,
        owner: req.bingelist._id
    })

    try {
        await bingenote.save()
        res.status(201).send(bingenote)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/bingenotes', auth , get_list , async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.platform) {
        match.platform = req.query.platform
    }
    
    if (req.query.name) {
        match.name = req.query.name
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
        await req.bingelist.populate({
            path: 'bingenotes',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.bingelist.bingenotes)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/bingenotes/:id', auth ,  async (req, res) => {
    const _id = req.params.id

    try {
        const bingenote = await Bingenote.findOne({ _id })

        if (!bingenote) {
            return res.status(404).send()
        }

        res.send(bingenote)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/bingenotes/:id', auth , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'platform', 'ref_link', 'name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const bingenote = await Bingenote.findOne({ _id: req.params.id})

        if (!bingenote) {
            return res.status(404).send()
        }

        updates.forEach((update) => bingenote[update] = req.body[update])
        await bingenote.save()
        res.send(bingenote)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/bingenotes/:id', auth , async (req, res) => {
    try {
        const bingenote = await Bingenote.findOneAndDelete({ _id: req.params.id})

        if (!bingenote) {
            res.status(404).send()
        }

        res.send(bingenote)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router