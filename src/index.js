const express = require('express')
const cors = require('cors')

const emailRouter = require('./routers/email')

const app = express()
const port = process.env.PORT

var whitelist = ['http://localhost:4200', 'https://reszon.com.br']
var corsOptions = {
    origin: function (origin, callback) {
        console.log('origin: ', origin)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(emailRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})