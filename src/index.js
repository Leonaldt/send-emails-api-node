const express = require('express')

const emailRouter = require('./routers/email')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(emailRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})