// dependencies
const { User, Blog, Tag, Professeur } = require('./sequelize')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// API ENDPOINTS

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})


// create a Professeur
app.post('/api/profs', (req, res) => {
    Professeur.create(req.body)
        .then(professeur => res.json(professeur))
})

// get all profs
app.get('/api/profs', (req, res) => {
    Professeur.findAll().then(professeur => res.json(professeur))
})
