class Model {

    getRecipesByIngredient(ingredient,dairyChecked,glutenChecked)
    {
        return $.get(`/recipes/ingredient/${ingredient}`)
            .then(response => {
                
                const filteredRecipes = response.filter(recipe => {
                    if (dairyChecked && glutenChecked) 
                    {
                        return !recipe.hasDairy && !recipe.hasGluten
                    }
                    
                    else if (dairyChecked) 
                    {
                        return !recipe.hasDairy
                    }
                
                    else if (glutenChecked) 
                    {
                        return !recipe.hasGluten
                    }
                    else 
                    {
                        return recipe
                    }
                })
        
                console.log(filteredRecipes)
                return filteredRecipes
            })       
  
    }


}