import { getFoodItemById } from "../service/menuService"
import { AmountButton } from "../pages/MenuPage"



export function SimpleBasketItem({id, userState}) {
    userState.getBasketById(id)
    console.log(getFoodItemById(id), id)
    let foodItem=getFoodItemById(id)
    return (
      <li>
        {/* <AmountButton id={id} userState={userState}/> */}
        <span class="basketQuantety"><AmountButton id={id} userState={userState}/></span>
        <span class="basketFoodItem">{foodItem.name}</span>
        <span class="basketPrice"><span>&#163;</span>{(foodItem.price*userState.getBasketById(id)).toFixed(2)}</span>
      </li>
    )
  }
  
  
  
  export function CustomBasketItem({id, userState}) {
    let argList = id.split("?")
    let conf = new URLSearchParams(argList[1])
    let foodItem = getFoodItemById(argList[0])
    console.log(conf)
    let ob = []
    let price = 0
    let names = []
    for (let [x, y] of conf) {
      ob.push(y)
    }
    for(let foodConfig of foodItem.foodConfig){
      for(let option of foodConfig.options) {
        if(ob.includes(option.id)) {
          ((option.price > 0) ? names.push("+ £"+(option.price).toFixed(2)+"  -  "+option.name) : names.push(option.name))
          price += option.price
        }
      }
    }
    console.log(ob)
    return <>
      <li>
      {/* <AmountButton id={id} userState={userState}/> */}
        <span class="basketQuantety">{<AmountButton id={id} userState={userState}/>}</span>
        <span class="basketFoodItem">{foodItem.name}</span>
        <span class="basketPrice"><span>&#163;</span>{((price+foodItem.price)*userState.getBasketById(id)[0]).toFixed(2)}</span>
      </li>
      <ul>
        <For each={names}>
          {(ele)=> <li><span className="basketExtraItem">{ele}</span></li>}
        </For>
      </ul>
    </> 
  }