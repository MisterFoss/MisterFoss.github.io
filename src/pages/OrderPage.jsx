import { getFoodItemById, menu, getTotal } from "../service/menuService"
import { AmountButton } from "./MenuPage"
import "../style/paymentStyle.css"
import { CustomBasketItem, SimpleBasketItem } from '../components/BasketItem';


export function OrderPage({ us }) {
  return <>
    <div class="header">
      <b>Cristina's</b> Kitchen
    </div>
    <div class="sumDiv">
      <div class="basketDiv">
        <BasketSummary userState={us}/>
      </div>
      <PaymentForm us={us} />
    </div>
  </>
}

// function BasketSummary({ us }) {
//   return <>
//     <div class="basketSummary">
//       <ul>
//         <For each={Object.keys(us.getBasket())}>
//           {(key) => {
//             let foodItem = getFoodItemById(key)
//             return (
//               <li>
//                 {foodItem.name} --- {us.getBasket()[key]} x {foodItem.price} --- {us.getBasket()[key] * foodItem.price}
//                 <AmountButton id={key} userState={us} />
//               </li>
//             )
//           }}
//         </For>
//         <li>
//           {getTotalFromBasket(us.getBasket())}
//         </li>
//       </ul>
//     </div>
//   </>
// }

function BasketSummary({userState}) {
  return <>
    <div class="basket">
      <h1>Basket</h1>
      <ul>
        <For each={Object.keys(userState.getBasket())}>  
          {id => (
            <Switch>
              <Match when={String(id).includes("?")}>
                <CustomBasketItem id={id} userState={userState}/>
              </Match>
              <Match when={true}>
                <SimpleBasketItem id={id} userState={userState}/>
              </Match>
            </Switch>
            )}
        </For>
        <span class="total" style="bottom: 5px;">Total: £{(getTotal(userState.getBasket())).toFixed(2)}</span>
      </ul>
    </div>
  </>
}
  




function PaymentForm({us}){
  return(
    <div class="paymentContainer">

      <form action="#" onSubmit={ev => {
        ev.preventDefault()
        let form = new FormData(ev.target)
        console.log(form)
        us.setBillingInfo(form)
        localStorage.setItem("order", JSON.stringify({
          basket: us.getBasket(),
          billing: Array.from(form.entries())
        }))
        window.location="/orderConfirmed"
        return false
        
      }}>

          <div class="row">

              <div class="col">

                  <h3 class="title">billing address</h3>

                  <div class="inputBox">
                      <span>full name :</span>
                      <input name="fullName" type="text" placeholder="John Deo"/>
                  </div>
                  <div class="inputBox">
                      <span>email :</span>
                      <input name="email" type="email" placeholder="example@example.com"/>
                  </div>
                  <div class="inputBox">
                      <span>address :</span>
                      <input name="address" type="text" placeholder="Housenumber -- Streetname"/>
                  </div>
                  <div class="inputBox">
                      <span>city :</span>
                      <input name="city" type="text" placeholder="London"/>
                  </div>

                  <div class="flex">
                      <div class="inputBox">
                          <span>state :</span>
                          <input name="state" type="text" placeholder="UK"/>
                      </div>
                      <div class="inputBox">
                          <span>Post code :</span>
                          <input name="postCode" type="text" placeholder="AB12 3CD"/>
                      </div>
                  </div>

              </div>

              <div class="col">

                  <h3 class="title">payment</h3>

                  <div class="inputBox">
                      <span>cards accepted :</span>
                      <img src="images/card_img.png" alt=""/>
                  </div>
                  <div class="inputBox">
                      <span>name on card :</span>
                      <input name="nameOnCard" type="text" placeholder="mr. J Deo"/>
                  </div>
                  <div class="inputBox">
                      <span>credit card number :</span>
                      <input name="cardNumber" type="number" placeholder="1111-2222-3333-4444"/>
                  </div>
                  <div class="inputBox">
                      <span>exp month :</span>
                      <input name="expMounth" type="text" placeholder="january"/>
                  </div>

                  <div class="flex">
                      <div class="inputBox">
                          <span>exp year :</span>
                          <input name="expYear" type="number" placeholder="2022"/>
                      </div>
                      <div class="inputBox">
                          <span>CVV :</span>
                          <input name="CCV" type="text" placeholder="123"/>
                      </div>
                  </div>

              </div>
      
          </div>

          <input type="submit" value="proceed to checkout" class="submit-btn"/>

      </form>
    </div>
  )
}