const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const bingelistRouter = require('./routers/bingelist')
const bingenoteRouter = require('./routers/bingenote')
const cors = require('cors'); 

const app = express()
app.use(cors());
const port = process.env.PORT || 3000



app.use(express.json())
app.use(userRouter)
app.use(bingelistRouter)
app.use(bingenoteRouter)
app.use(cors());

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



const main = async () => {

}

main()

















// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })