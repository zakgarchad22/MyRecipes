

const view = new View($("#recipes") , $("#shoping"))
const model = new Model
const controller = new Controller(view,model)
controller.getRecipesByIngredient()
view.clickPicAlert()
view.iteamToRemember()
view.myFavorite()
view.deleteItem()
