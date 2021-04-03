const Bingelist = require('../models/bingelist')
const get_list = async (req, res, next) => {
    try {
        const bingelist = await Bingelist.findOne({ _id: req.query.binge_id,  owner: req.user._id  })
        if (!bingelist) {
            throw new Error()
        }

        req.bingelist = bingelist
        next()
    } catch (e) {
        res.status(404).send({ error: 'Bingenote not found!' })
    }
}

module.exports = get_list 