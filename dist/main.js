const source = $("#recipes-template").html();
const template = Handlebars.compile(source);

const render = function(recipes) {
    $("#recipes").empty()
    let newHtml = template(recipes)
    $("#recipes").append(newHtml)
}

const getRecipesByIngredient = function() {
    let ingredient = $("#input-recipes-ingredient").val()
    let dairyChecked = $("#dairy-checkbox").is(":checked")
    let glutenChecked = $("#gluten-checkbox").is(":checked")

    $.get(`/recipes/ingredient/${ingredient}`, function(response) {
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

        render(filteredRecipes)
    })
}



$('#recipes').on('click', '.list-group-item', function() {
    $(this).toggleClass('red-background')
})
