import { createSignal, For, Match, Show, Switch } from 'solid-js';
import { getFoodItemById, getTotal, menu } from '../service/menuService';
import { CustomBasketItem, SimpleBasketItem } from '../components/BasketItem';

export function MenuPage({us}) {  
  return (
    <>
      <div class="header">
        <b>Cristina's</b> Kitchen
        <button class="logInButton" type="button" onClick={us.toggleLoggedIn.bind(us)}>
          {us.isLoggedIn() ? "Log Out":"Log In"}
        </button>
      </div>
      <div class="topbar">
        <TableOfContents categories={menu.categories}/>
      </div>
      <div class="menuBody">
        <Menu menu={menu} userState={us}/>
        <Show when={us.isLoggedIn()}>
          <div class="basketDiv">
            <Basket userState={us}/>
          </div>
        </Show>
      </div>
    </>
  );
}


function FoodCell({foodItem, userState}) {
  return (
    <>
      <div class="cell">
        <div class="splash" style={{"background-image":`url(${foodItem.image})`}}></div>
        <div class="titel">{foodItem.name}</div>
        <div class="price"><span>&#163;</span>{foodItem.price.toFixed(2)}</div>
        <Show when={userState.isLoggedIn()}>
          <Show when={foodItem.foodConfig} fallback={<AmountButton id={foodItem.id} userState={userState}/>}>
            <FoodConfigPopUp foodItem={foodItem} userState={userState}/>
          </Show>
        </Show>
      </div>
    </>
  );
}

export function AmountButton({id, userState}) {
  return <>
    <div class="addToBasket">
      <Show when={userState.getBasketById(id) != null}>
        <button type='button' class="pluss-minus" onClick={() => userState.setBasketById(id, -1)}>-</button>
      </Show>
      <span class="number">{userState.getBasketById(id)?.[0]||userState.getBasketById(id)}</span>
      <button type='button' class="pluss-minus" onClick={() => userState.setBasketById(id, 1)}>+</button>
    </div>
  </>
}

function FoodConfigPopUp({foodItem, userState}) {
  let [popupState, setPopState] = createSignal(false)
  function togglePopup() {
    if (popupState() == false) {
      setPopState(true)
    }
    else {
      setPopState(false)
    }
  }
  
  return<>
    <div class="addToBasket">
      <button class="pluss-minus" type="button" onClick={togglePopup}>+</button>
    </div>  
    <Show when={popupState()}>
      <Portal>
        <div class="foodConfigPopup">
          <div class="clickDiv" onClick={togglePopup}></div>
          <div class="foodConfigPopup-content">
          <button class="close" type='button' onClick={togglePopup}>X </button>
          <div class="splash" style={{"background-image":`url(${foodItem.image})`}}></div>
            <form action="#" onSubmit={ev => {
              ev.preventDefault()
              const queryString = new URLSearchParams(new FormData(ev.target)).toString()
              userState.setBasketById(foodItem.id, 1, queryString)
              togglePopup()
              return false
              }}>
              <For each={foodItem.foodConfig}>
                {config => <FoodConfigForm config={config}/>}
              </For>
              <input type="submit" value="Add to basket" class="submit-btn"/>
            </form>
          </div>
        </div>
      </Portal>
    </Show>
  </>
}



function FoodConfigForm({config}) {
  return <>
  <Switch>
    <Match when={config.type=="singleSelect"}>
      <fieldset>
        <legend>{config.name}</legend>
        <For each={config.options}>
          {option => (
            <label>
              <input type="radio" name={config.id} value={option.id} required/>
              {option.name} --- {option.price}
            </label>
          )}
        </For>
      </fieldset>
    </Match>
    <Match when={config.type=="multiSelect"}>
    <fieldset>
        <legend>{config.name}</legend>
        <For each={config.options}>
          {option => (
            <label>
              <input type="checkbox" name={config.id} value={option.id}/>
              {option.name} --- {option.price}
            </label>
          )}
        </For>
      </fieldset>
    </Match>
</Switch>
  </>
}


function FoodCategory({category, userState}) {
  return (
    <>
    <div class="categoryName" id={category.id}>{category.name}</div>
    <div class="categoryContainer">
      <ul class="foodItemList">
        <For each={category.foodItems}>
          {foodItem => <FoodCell foodItem={foodItem} userState={userState}/>}
        </For>
      </ul>
    </div>
    </>
  )
}

function TableOfContents({categories}) {
  return <>
    <ul class="categoryTopBar">
      <For each={categories}>
        {category =>
          <li>
            <a href={"#"+category.id}>{category.name}</a>
          </li>
        }
      </For>
    </ul>
  </>
}


function Menu({menu, userState} ) {
  return (
    <>
    <div class="menu">
      <For each={menu.categories}>
        {category => <FoodCategory category={category} userState={userState}/>}
      </For>
    </div>
    </>
  )
}

function Basket({userState}) {
  return <>
    <div class="basket">
      <h1>Basket</h1>
      <ul>
        <For each={Object.keys(userState.getBasket())}>  
          {id => (
            <Switch>
              <Match when={String(id).includes("?")}>
                {console.log("wrong")}
                <CustomBasketItem id={id} userState={userState}/>
              </Match>
              <Match when={true}>
                {console.log("right")}
                <SimpleBasketItem id={id} userState={userState}/>
              </Match>
            </Switch>
            )}
        </For>
        <a href='/orderSummary' className='orderButton'>Checkout</a>
        <span class="total">£{(getTotal(userState.getBasket())).toFixed(2)}</span>
      </ul>
    </div>
  </>
}
