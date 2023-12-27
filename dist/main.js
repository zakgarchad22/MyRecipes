
const apiManager = new ApiManager()
const render = new Render()




function generateCommentsHtml(recipe) {
   
    return recipe.comments.map(comment => `
        <div class="comment">${comment.text}
            <button class="btn btn-danger delete-comment" data-recipe-id="${recipe.idMeal}" data-comment-id="${comment.id}">Delete</button>
        </div>
    `).join('')
}
function renderComments(recipe) 
{
    const commentsHtml = this.generateCommentsHtml(recipe)
    $(`#comments-${recipe.idMeal}`).html(commentsHtml)
}

$('#recipes').on('click', '.delete-recipe', function(event) 
{
    
    const $item = $(event.currentTarget)
    const id = $item.data("recipe-id")
    apiManager.deleteRecipe(id)
    render.renderRecipes(apiManager.recipes)
   
   
})

    $('#recipes').on('click', '.list-group-item', function(event) 
    {
        const $item = $(event.currentTarget)
        const itemText = $item.text()
        apiManager.addToShoppingList(itemText)
        apiManager.updateItemColor($item, 'red')
        console.log(apiManager.recipes)
        render.renderShopping(apiManager.shoppingItems)
    })

    $('#recipes').on('click', '.card-img-top', function(event) 
    {
        const firstIngredient = $(event.currentTarget).closest('.card').find('.list-group-item:first').text()
        alert(firstIngredient)
    })

    $('#recipes').on('click', '.favorites', function(event) 
    {
        alert("you are my favorite")
    })

    $('#shopping').on('click', '.delete-item', function(event) 
    {
        const itemToDelete = $(event.currentTarget).data('item')
        apiManager.removeFromShoppingList(itemToDelete)
        $('#recipes').find(`.list-group-item:contains('${itemToDelete}')`).css('color', 'black')
        render.renderShopping(apiManager.shoppingItems)
    })

    $('.buyList').on('click', function() 
    {
        $('#dropdown-content').toggle()
    })
    $(document).on('click', '.add-comment-button', function(event) 
    {
        const recipeId = $(event.target).data('recipe-id')
        const commentText = $(`#comment-input-${recipeId}`).val()
        apiManager.manageComments(recipeId, { text: commentText }, 'add')
        render.renderRecipes(apiManager.recipes)
    })

    $(document).on('click', '.delete-comment', event => 
    {
        const recipeId = $(event.target).data('recipe-id')
        const commentId = $(event.target).data('comment-id')
        apiManager.manageComments(recipeId, { id: commentId }, 'remove')
        render.renderRecipes(apiManager.recipes)
    })



function searchRecipes() 
{

const ingredient = $("#input-recipes-ingredient").val()
const dairyChecked = $("#dairy-checkbox").is(":checked")
const glutenChecked = $("#gluten-checkbox").is(":checked")

if (ingredient.length === 0) 
{
    return
}

apiManager.getRecipesByIngredient(ingredient, dairyChecked, glutenChecked)
        .then(filteredRecipes => render.renderRecipes(filteredRecipes))
     
        .catch(err => {console.error("problem with fitch", err)})
            
    
}