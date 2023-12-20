const express = require('express')
const router = express.Router()
const axios = require('axios')
const { dairyIngredients, glutenIngredients } = require('../../config')
const RECIPES_API = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"


function filterSensitives(ingredients) 
{
    let hasDairy = false
    let hasGluten = false
    //for every ingredient 
    ingredients.forEach((ingredient) => 
    {
      if (dairyIngredients.includes(ingredient)) {
        hasDairy = true
      }
      if (glutenIngredients.includes(ingredient)){
        hasGluten = true
      }
 
    })
    return { 
            hasDairy,
            hasGluten 
           }

  }
  


router.get('/ingredient/:ingredient', (req, res) => {

    const ingredient = req.params.ingredient
    axios.get(`${RECIPES_API }${ingredient}`)
        .then((response) => {
            const specificRecipes = response.data.results.map(recipe => {

            const { hasDairy, hasGluten } = filterSensitives(recipe.ingredients)
            return {
                    idMeal: recipe.idMeal,
                    title: recipe.title,
                    thumbnail: recipe.thumbnail,
                    href: recipe.href,
                    ingredients: recipe.ingredients,
                    hasDairy, 
                    hasGluten
                }
            })
            res.send(specificRecipes)
        })  
})




module.exports = router //to put to config
