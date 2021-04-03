const mongoose = require('mongoose')

const bingenoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    platform: {
        type: String,
        trim: true
    },
    ref_link: {
        type: String,
        trim: true
    },


    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})



const Bingenote = mongoose.model('Bingenote', bingenoteSchema)

module.exports = Bingenote