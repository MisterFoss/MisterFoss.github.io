import { createSignal } from 'solid-js';


export default class userState {
    constructor() {
        let [isLoggedIn,setLoggedIn]=createSignal(false)
        let [getBasket, setBasket]=createSignal({})
        let [getBillingInfo, setBillingInfo]=createSignal(null)
        this.isLoggedIn=isLoggedIn;
        this.getBasket=getBasket;
        this.setLoggedIn=setLoggedIn;
        this.setBasket=setBasket;
        this.setBillingInfo=setBillingInfo;
        this.getBillingInfo=getBillingInfo;
    }
  
    toggleLoggedIn() {
        if (this.isLoggedIn() == false) {
            this.setLoggedIn(true)
        }
        else {
            this.setLoggedIn(false)
        }
    }
  
    getBasketById(id) {
        if(String(id).includes("?")) {
            let conf = id.split("?")
            return [this.getBasket()[id], conf]
        }
        else{
            return this.getBasket()[id]
        }
    }
    
    setBasketById(id, value, config=null) {
        let basket={...this.getBasket()}
        if(config) {
            const confId = id+"?"+config
            basket[confId] = basket[confId]||0 + 1
        }
        else {
            if(basket[id] == null && value > 0) {
                basket[id]=value
            }
            else if(basket[id]+value <= 0) {
                delete basket[id]
            }
            else {
                basket[id]=basket[id]+value
            }
        }
        this.setBasket(basket)
    }

}