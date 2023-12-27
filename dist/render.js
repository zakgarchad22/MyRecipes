class Render {
    constructor(apiManager) 
    {
        this.$htmlRecipes = $("#recipes")
        this.$htmlShopping = $("#shopping")
        
        this.apiManager = apiManager
       
    }

    renderRecipes(filteredRecipes) 
    {
       console.log(filteredRecipes);
        this.$htmlRecipes.empty()
        const source = $("#recipes-template").html()
        const template = Handlebars.compile(source)
        const newHtml = template(filteredRecipes )
        this.$htmlRecipes.append(newHtml)
    }

    renderShopping(item) 
    {
        const dropdownContent = $('#dropdown-content')
        if (item.length === 0) 
        {
            dropdownContent.hide()
            this.$htmlShopping.empty()
        } else 
        {
            const source = $("#shopping-list-template").html()
            const template = Handlebars.compile(source)
            const newHtml = template({ items: item })
            this.$htmlShopping.html(newHtml)
        }
    }


  


}
