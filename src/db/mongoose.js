const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vatsal:bingelist@cluster0.sayfn.mongodb.net/binge?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
//mongodb+srv://vatsal:<password>@cluster0.sayfn.mongodb.net/<dbname>?retryWrites=true&w=majority
//Replace <password> with the password for the vatsal user. Replace <dbname> with the name of the database that connections will use by default. Ensure any option params are URL encoded.







//mongodb://127.0.0.1:27017/task-manager-api
//mongodb+srv://vatsal:bingelist@cluster0.sayfn.mongodb.net/binge?retryWrites=true&w=majority





