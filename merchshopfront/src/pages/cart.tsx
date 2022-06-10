import React, {FC,useState, useEffect,useContext} from "react";
import CartItem from "../components/cartItem";
import {ImBin} from "react-icons/im"
import { cartContext } from "../contexts/cartContext";
import Item from "./item";

const Cart:FC = () => {

    const {cartItems,handleCartChange} = useContext(cartContext);
    const getTotalPrice = ():string  => {
        let total = 0;
        for(let i = 0; i < cartItems.length; i++){
            total += (cartItems[i].item.price * cartItems[i].quantity);
        }

        return total.toLocaleString("en",{useGrouping: false,minimumFractionDigits: 2});
    }

    const [totalPrice,setTotalPrice] = useState(getTotalPrice());
    const emptyCart = () => {
        //local.storage
        if(handleCartChange){
            handleCartChange(undefined,undefined);
            window.scrollTo(0, 0);
            setTotalPrice("0.00")
        }
    }

    const forceRender = ():void => {
        setTotalPrice(getTotalPrice());
    }

    const checkOut = () => {

    }

    document.title = "Cart - Merch shop"
    return (
        <div className="main-container">
            { cartItems.length === 0 && 
            <div className="text-center font-semibold text-xl">
                Your cart is empty
            </div>
            }
            { cartItems.length !== 0 && <>
            <div className="cart-columns">
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className="font-semibold">Product</div>
                <div className="font-semibold">Price</div>
                <div className="font-semibold">Quantity</div>
                <div className="font-semibold">Total price</div>
            </div>
            <div className="cart-divider"></div>

            {cartItems.map((item,index) => 
                    <CartItem key = {index} item = {item.item} quantity = {item.quantity} parentCallBack = {forceRender}/>)
            }
            <div className="flex flex-row mt-8 xl:mx-12 lg:mx-10 md:mx-8 sm:mx-4">
                <div className="flex cursor-pointer font-semibold hover:text-red-500" onClick = {emptyCart}>
                    <ImBin/>&nbsp;Empty cart
                </div>
                <div className=" ml-auto">Total: {totalPrice} zł</div>
            </div>
            <div className="btn-black my-20">Proceed to checkout</div>
            </>}
        </div>
    );
}

export default Cart;