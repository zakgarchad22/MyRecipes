class Model {

    getRecipesByIngredient(ingredient,dairyChecked,glutenChecked)
    {
        return new Promise((resolve,reject) => {
            $.get(`/recipes/ingredient/${ingredient}`, (response) => {
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
    
            resolve(filteredRecipes)
        })        
    })
    }


}