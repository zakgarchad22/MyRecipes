
class ApiManager 

    {

        constructor(){
            this.recipes = []
            this.shoppingItems = []

        }

        printer(url)
        {
        console.log(url);
        }

    getRecipesByIngredient(ingredient, dairyChecked, glutenChecked) {


        return $.get(`/recipes/ingredient/${ingredient}`)
           .then(response => {
            
            this.recipes = response.filter(recipe => {  
           

                    
                    if (dairyChecked && glutenChecked) 
                    {
                        return !recipe.hasDairy && !recipe.hasGluten
                    } else if (dairyChecked) 
                    {
                        return !recipe.hasDairy
                    } else if (glutenChecked) 
                    {
                        return !recipe.hasGluten
                    } else 
                    {
                        return recipe
                    }
                })
            
         
                return this.recipes     
            })
          
        
            .catch(err => {
                console.error("Failed to fetch recipes", err)
                throw err
            })
    }

    
    getRecipeById(recipeId) 
    {
       
        return this.recipes.find(r => r.idMeal == recipeId)
    }
    
    addToShoppingList(itemText) 
    {
        const itemIndex = this.shoppingItems.indexOf(itemText)
        if (itemIndex === -1) 
        {
            this.shoppingItems.push(itemText)
            
        }
    }
    deleteRecipe(id) 
    {
      
        this.recipes = this.recipes.filter(r => r.idMeal != id)
        console.log(this.recipes)
       
    }
    removeFromShoppingList(itemToDelete) 
    {
        this.shoppingItems = this.shoppingItems.filter(item => item !== itemToDelete)
      
        if (this.shoppingItems.length === 0) 
        {
            $('#dropdown-content').hide()
        }
    }

    updateItemColor(item, color) 
    {
        item.css('color', color)
    }

    manageComments = (recipeId, comment, action) => {
        let recipe = this.getRecipeById(recipeId)
    
            if (action === 'add') 
            {

                    let commentId = `${recipe.comments.length + 1}`
                    const newComment = 
                    {
                        id: commentId,
                        text: comment.text             
                    }
                    recipe.comments = recipe.comments || []
                    recipe.comments.push(newComment)
                
            } 
            else if (action === 'remove') 
            {
            const commentId = comment.id
            recipe.comments = recipe.comments.filter(comment => comment.id != commentId)
                
            }
           
            renderComments(recipe)
         

    }
}
