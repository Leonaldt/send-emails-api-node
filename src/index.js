const express = require('express')
const os = require('os')
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
    console.log ('\x1b[31m%s\x1b[0m', `Server is up on port ' + ${port}`)
    console.log('\x1b[31m%s\x1b[0m', `User Info: ${JSON.stringify(os.userInfo())}`); // ""
    console.log('\x1b[31m%s\x1b[0m', `Type: ${os.type()}`); // "Windows_NT"
    console.log('\x1b[31m%s\x1b[0m', `Release: ${os.release()}`); // "10.0.14393"
    console.log('\x1b[31m%s\x1b[0m', `Platform: ${os.platform()}`); // "win32"
})