const express = require('express')
const router = express.Router()
const axios = require('axios')
const { faker } = require('@faker-js/faker');
const { dairyIngredients, glutenIngredients } = require('../../config')
const RECIPES_API = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"


function filterSensitives(ingredients) 
{
    return { 
      hasDairy: ingredients.some(ingredient => dairyIngredients.includes(ingredient)),
      hasGluten: ingredients.some(ingredient => glutenIngredients.includes(ingredient))
    }
  }

router.get('/ingredient/:ingredient', (req, res) => {

    const ingredient = req.params.ingredient
    axios.get(`${RECIPES_API }${ingredient}`)
        .then((response) => {
            const specificRecipes = response.data.results.map(recipe => {
            const randomStar = Math.floor(Math.random() * 6)
            const randomStarArray = Array(randomStar).fill('*')
  
        
            const nameChef = faker.person.fullName()
            const { hasDairy, hasGluten } = filterSensitives(recipe.ingredients)

            return {
                    idMeal: recipe.idMeal,
                    title: recipe.title,
                    thumbnail: recipe.thumbnail,
                    href: recipe.href,
                    ingredients: recipe.ingredients,
                    hasDairy, 
                    hasGluten,
                    randomStarArray : randomStarArray,
                    nameChef :nameChef
                }
            })

            res.send(specificRecipes)
        })  
})




module.exports = router //to put to config
