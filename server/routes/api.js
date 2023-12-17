const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/recipes/ingredient/:ingredient', (req, res) => 
{
    const ingredient = req.params.ingredient
    axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`)
        .then((response) => {
            const specificRecipes = response.data.results.map(recipe => ({
                idMeal: recipe.idMeal,
                title: recipe.title,
                thumbnail: recipe.thumbnail,
                href: recipe.href 
            }))
            res.send(
                specificRecipes
                )
         
        })   
})


module.exports = router
