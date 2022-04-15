import { Routes, Route } from "solid-app-router"

import './style/stylesheet.css';
import { MenuPage } from './pages/MenuPage';
import { OrderPage } from "./pages/OrderPage";
import { OrderConfirmPage } from "./pages/OrderConfirmPage";
import userState from "./service/userState";


export function App(props) {
  let us = new userState()
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuPage us={us}/>} />
        <Route path="/lifeAtCUSC" element={<></>} />
        <Route path="/orderSummary" element={<OrderPage us={us}/>} />
        <Route path="/payment" element={<></>} />
        <Route path="/orderConfirmed" element={<OrderConfirmPage us={us}/>} />
      </Routes>
    </>
  )
};