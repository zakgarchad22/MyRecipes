const express = require('express')
const router = express.Router()
const axios = require('axios')



function filterSensitives(ingredients) {
    const dairyIngredients = ["Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella", "Custard", "Cream Cheese"]
    const glutenIngredients = ["Flour", "Bread", "Spaghetti", "Biscuits", "Beer"]
  

    let hasDairy = false
    let hasGluten = false
  

    ingredients.forEach((ingredient) => {
      if (dairyIngredients.includes(ingredient)) 
      {
        hasDairy = true
      }
      if (glutenIngredients.includes(ingredient)) 
      {
        hasGluten = true
      }
    })
  
    
    return { 
            hasDairy,
            hasGluten 
        }
  }
  


router.get('/recipes/ingredient/:ingredient', (req, res) => {
    const ingredient = req.params.ingredient
    axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`)
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
            console.log(specificRecipes)
            res.send(specificRecipes)
        })  
})




module.exports = router
