class Controller {

constructor(view , model)
{
    this.view = view
    this.model = model
         
}

getRecipesByIngredient = () => 
{
    
    let ingredient = $("#input-recipes-ingredient").val()
    if(ingredient.length === 0)
    {
        return
    }
        
        
    let dairyChecked = $("#dairy-checkbox").is(":checked")
    let glutenChecked = $("#gluten-checkbox").is(":checked")

    this.model.getRecipesByIngredient(ingredient,dairyChecked,glutenChecked)
    .then(filteredRecipes => this.view.render(filteredRecipes))
    .catch((err) => 
    {
        console.error("faild to fetch recipes",err)  
    })
    
      
}


}