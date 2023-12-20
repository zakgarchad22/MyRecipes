

const view = new View($("#recipes") , $("#shopping"))
const model = new Model
const controller = new Controller(view,model)
controller.getRecipesByIngredient()
view.clickPicAlert()
view.itemToRemember()
view.myFavorite()
view.deleteItem()
view.showBuyList() 