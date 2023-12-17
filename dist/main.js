const source = $("#recipes-template").html();
const template = Handlebars.compile(source);

const render = function(recipes) {
    $("#recipes").empty()
    let newHtml = template(recipes)
    $("#recipes").append(newHtml)
}

const getRecipesByIngredient = function() {
    let ingredient = $("#input-recipes-ingredient").val()
    $.get(`/recipes/ingredient/${ingredient}`, function(response) 
    {
    console.log(response);
    render(response)
    })
}
