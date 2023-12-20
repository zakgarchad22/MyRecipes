class View
{
    

constructor($htmlRecipes , $htmlShopping) 
{
    this.$htmlRecipes = $htmlRecipes
    this.$htmlShopping = $htmlShopping
    this.favorites = []
    this.shoppingItems = []   
}


render(filteredRecipes)
{
    this.$htmlRecipes.empty()
    const source = $("#recipes-template").html()
    const template = Handlebars.compile(source)
    const newHtml = template(filteredRecipes)
    this.$htmlRecipes.append(newHtml)
}

renderShopping()
{
    const dropdownContent = $('#dropdown-content')
    if (this.shoppingItems.length === 0) {
        dropdownContent.hide()
        
    } 
    else 
    {
        
    const source = $("#shopping-list-template").html()
    const template = Handlebars.compile(source)
    const newHtml = template({ items: this.shoppingItems })
    this.$htmlShopping.html(newHtml)
    }

}


itemToRemember() 
{
    this.$htmlRecipes.on('click', '.list-group-item', (event) => {         
    const $item = $(event.currentTarget)
    const itemText = $item.text()
    const itemIndex = this.shoppingItems.indexOf(itemText) 
    if(itemIndex === -1)
    {
    this.shoppingItems.push(itemText)
    }
    this.renderShopping()
    })   

}
    

clickPicAlert() 
{
    this.$htmlRecipes.on('click', '.card-img-top', (event) => {
    const $item = $(event.currentTarget)
    const firstIngredient = $item.closest('.card').find('.list-group-item:first').text()
    alert(firstIngredient)
    })
}

myFavorite() 
{
    this.$htmlRecipes.on('click','.favorites' ,(event) =>{
    const $item = $(event.currentTarget)
    const itemToAdd = $item.data('item')
    alert("you are my favorite")
    })
   
}

deleteItem() {
    this.$htmlShopping.on('click', '.delete-item', (event) => {
    const $item = $(event.currentTarget)
    const itemToDelete = $item.data('item')
    this.shoppingItems = this.shoppingItems.filter(item => item !== itemToDelete)
    $item.closest('li').remove()
    this.renderShopping()
    })
}
showBuyList() {
    
    $('.dropbtn').on('click', (event) => {
       
        $('#dropdown-content').toggle()
    })
}




}