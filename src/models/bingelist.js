const mongoose = require('mongoose')
const Bingenote = require('./bingenote')

const bingelistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    shared: {
        type: Boolean,
        default: false
    },
    list_review: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 2
    },
    share_link: {
        type: String,
        trim: true
    },
    typer: {
        type: String,
        required: true,
        validate(value){
            if ((value!="movie") && (value!="educational"))
            {
                throw new Error("Invalid input") 

            }
        }

    },


    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

bingelistSchema.virtual('bingenotes', {
    ref: 'Bingenote',
    localField: '_id',
    foreignField: 'owner'
})




// Delete user tasks when user is removed
bingelistSchema.pre('remove', async function (next) {
    const bingelist = this
    console.log("executed")
    //////////////////////////////////////////////////////////////////////////
    await Bingenote.deleteMany({ owner: bingelist._id })
    next()
})

 

const Bingelist = mongoose.model('Bingelist', bingelistSchema)

module.exports = Bingelist