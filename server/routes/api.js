const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/recipes/ingredient/:ingredient', (req, res) => 
{
    const ingredient = req.params.ingredient
    axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`)
        .then((response) => {
            res.send(response.data)
         
        })

})

router.get('/recipes/id/:id', (req, res) => 
{
    const id = req.params.id
    axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/id/${id}`)
        .then((response) => {
            res.send(response.data)
         
        })

})




module.exports = router
