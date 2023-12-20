const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const recipesApi = require('./server/routes/recipesApi')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/recipes', recipesApi)

const port = 5000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})