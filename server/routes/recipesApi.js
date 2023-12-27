const express = require('express')
const router = express.Router()
const axios = require('axios')
const { faker } = require('@faker-js/faker');
const { dairyIngredients, glutenIngredients } = require('../../config')
const RECIPES_API = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"

let count = 0
function filterSensitives(ingredients) 
{
    return { 
      hasDairy: ingredients.some(ingredient => dairyIngredients.includes(ingredient)),
      hasGluten: ingredients.some(ingredient => glutenIngredients.includes(ingredient))
    }
  }

router.get('/ingredient/:ingredient', (req, res) => {
    count = 0
    const ingredient = req.params.ingredient
    Promise.all([
      axios.get(`${RECIPES_API}${ingredient}`),
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=cPQzhdeZjoZy77ocaK7BGhe4tIYDuaDZ&q=${ingredient}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
  ])
  .then(([recipesResponse, giphyResponse]) => {
    
            
            
            const specificRecipes = recipesResponse.data.results.map((recipe,index) => {
           
            const randomStar = Math.floor(Math.random() * 6)
            const randomStarArray = Array(randomStar).fill('*')    
            const nameChef = index % 3 === 0 ? 'Special Chef' : faker.person.fullName()
            const { hasDairy, hasGluten } = filterSensitives(recipe.ingredients)
           
            const gifUrl = (giphyResponse.data.data[count++].embed_url);
            

            return {

                    idMeal: recipe.idMeal,
                    title: recipe.title,
                    thumbnail: recipe.thumbnail,
                    href: recipe.href,
                    ingredients: recipe.ingredients,
                    hasDairy, 
                    hasGluten,
                    randomStarArray : randomStarArray,
                    nameChef :nameChef,
                    gifUrl : gifUrl

                  
                }
            })

            res.send(specificRecipes)
        })  

})



module.exports = router //to put to config
