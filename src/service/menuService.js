import menuJson from "../assets/menu.json";
export const menu = menuJson

export function getFoodItemById(id) {
    for(let category of menu.categories) {
      for(let foodItem of category.foodItems) {
        if(foodItem.id == id) {
          return foodItem
        }
      }
    }

}

export function getTotalFromBasket(basket) {
    let total = 0
    for(let key of Object.keys(basket)) {
        total+=(getFoodItemById(key).price*basket[key])
    }
    return total
}

export function getTotal(basket) {
  console.log(basket)
  let total = 0
  for(let id of Object.keys(basket)) {
    if(String(id).includes("?")) {
      let argList = id.split("?")
      let conf = new URLSearchParams(argList[1])
      let foodItem = getFoodItemById(argList[0])
      console.log(conf)
      let ob = []
      let price = foodItem.price
      let names = []
      for (let [x, y] of conf) {
        ob.push(y)
      }
      for(let foodConfig of foodItem.foodConfig){
        for(let option of foodConfig.options) {
          if(ob.includes(option.id)) {
            price += option.price
          }
        }
      }
      console.log(price)
      total += basket[id]*price
    }
    else{
      let foodItem = getFoodItemById(id)
      total += foodItem.price*basket[id]
    }
  
  }
  console.log(total)
  return total 
}