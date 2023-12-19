class View
{
    

constructor($htmlRecipies , $htmlShoping) 
{
    this.$htmlRecipies = $htmlRecipies
    this.$htmlShoping = $htmlShoping
    this.favorites = []
    this.shoppingItems = []   
}


render(filteredRecipes)
{
    this.$htmlRecipies.empty()
    const source = $("#recipes-template").html()
    const template = Handlebars.compile(source)
    const newHtml = template(filteredRecipes)
    this.$htmlRecipies.append(newHtml)
}

renderShoping()
{
    const source = $("#shopping-list-template").html()
    const template = Handlebars.compile(source)
    const newHtml = template({ items: this.shoppingItems })
    this.$htmlShoping.html(newHtml)

}


iteamToRemember() 
{
    this.$htmlRecipies.on('click', '.list-group-item', (event) => {         
    const $item = $(event.currentTarget)
    const itemText = $item.text()
    const itemIndex = this.shoppingItems.indexOf(itemText) 
    if(itemIndex === -1)
    {
    this.shoppingItems.push(itemText)
    }
    this.renderShoping()
    })       
}
    

clickPicAlert() 
{
    this.$htmlRecipies.on('click', '.card-img-top', (event) => {
    const $item = $(event.currentTarget)
    const firstIngredient = $item.closest('.card').find('.list-group-item:first').text()
    alert(firstIngredient)
    })
}

myFavorite() 
{
    this.$htmlRecipies.on('click','.favorites' ,(event) =>{
    const $item = $(event.currentTarget)
    const itemToAdd = $item.data('item')
    alert("you are my favorite")
    })
   
}

deleteItem() {
    this.$htmlShoping.on('click', '.delete-item', (event) => {
    const $item = $(event.currentTarget)
    const itemToDelete = $item.data('item')
    this.shoppingItems = this.shoppingItems.filter(item => item !== itemToDelete)
    $item.closest('li').remove()
    })
}



}