import { Match, Switch } from "solid-js"
import { getFoodItemById, menu, getTotal } from "../service/menuService"
// import { SimpleBasketItem, CustomBasketItem } from "../components/BasketItem"

export function OrderConfirmPage({us}) {
    const orderString = localStorage.getItem("order")
    const order = orderString?JSON.parse(orderString):null
    console.log(order.basket)
    console.log(order.billing)
    return <>
        <div class="header">
          <b>Cristina's</b> Kitchen
        </div>
        <div class="confirmationDiv">
          <div class="basketDiv">
            <BasketSummary basket={order.basket}/>
          </div>
          <div class="orderConfirmed">
            {console.log(order.billing)}
            <OrderConfirmed billing={order.billing}/>
          </div>
        </div>
    </>
}



function OrderConfirmed({billing}) {
  let time = new Date(new Date().getTime() + 11*60000);
  return <>
    <h1>Order Confirmed!</h1>
    <h2>Thank you {billing[0][1]}, for ordering from Cristina's Kitchen.</h2>
    <div class="text">
      A email confirming your order has bee sent to the email address: {billing[1][1]}
    </div>
    <div class="text">Bring your order number and student ID when picking up your order. Your order should be ready by the time displayed below.</div>
    <div class="orderNumber">
      Order Number {Math.floor(Math.random() * 1000)}
    </div>
    <div class="pickUpTime">
      Pick up time: {time.getHours()}:{time.getMinutes()}
    </div>
  
  </>
}

function BasketSummary({basket}) {
  return <>
    <div class="basket">
      <h1>Basket</h1>
      <ul>
        <For each={Object.keys(basket)}>  
          {id => (
            <Switch>
              <Match when={String(id).includes("?")}>
                <CustomBasketItem id={id} basket={basket}/>
              </Match>
              <Match when={true}>
                <SimpleBasketItem id={id} basket={basket}/>
              </Match>
            </Switch>
            )}
        </For>
        <span class="total" style="bottom: 5px; padding: 30px;">Total: £{(getTotal(basket)).toFixed(2)}</span>
      </ul>
    </div>
  </>
}







function SimpleBasketItem({id, basket}) {
  basket[id]
  let foodItem=getFoodItemById(id)
  return (
    <li>
      <span class="basketQuantety">{basket[id]}</span>
      <span class="basketFoodItem">{foodItem.name}</span>
      <span class="basketPrice"><span>&#163;</span>{(foodItem.price*basket[id]).toFixed(2)}</span>
    </li>
  )
}



function CustomBasketItem({id, basket}) {
  let argList = id.split("?")
  let conf = new URLSearchParams(argList[1])
  let foodItem = getFoodItemById(argList[0])
  let ob = []
  let price = 0
  let names = []
  for (let [x, y] of conf) {
    ob.push(y)
  }
  for(let foodConfig of foodItem.foodConfig){
    for(let option of foodConfig.options) {
      if(ob.includes(option.id)) {
        ((option.price > 0) ? names.push(option.name+" + "+option.price) : names.push(option.name))
        price += option.price
      }
    }
  }
  console.log(ob)
  return <>
    <li>
        <span class="basketQuantety">{basket[id][0]}</span>
        <span class="basketFoodItem">{foodItem.name}</span>
        <span class="basketPrice"><span>&#163;</span>{((price+foodItem.price)*basket[id][0]).toFixed(2)}</span>
      </li>
      <ul>
        <For each={names}>
          {(ele)=> <li><span className="basketExtraItem">{ele}</span></li>}
        </For>
      </ul>
  </> 
}
