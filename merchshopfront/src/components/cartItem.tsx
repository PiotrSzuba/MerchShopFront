import React, {FC,useState, useEffect, useContext} from "react";
import {VscChromeClose} from 'react-icons/vsc';
import { cartItem } from "../types";
import { cartContext } from "../contexts/cartContext";

const CartItem:FC<cartItem> = ({item,quantity,parentCallBack}:cartItem) => {

    const formatDecimal = (price:number):string => {
        return price.toLocaleString("en",{useGrouping: false,minimumFractionDigits: 2});
    }

    const [amount,setAmount] = useState<number>(quantity);
    const [totalPrice,setTotalPrice] = useState<string>(formatDecimal(item.price * quantity));
    const {cartItems,handleCartChange} = useContext(cartContext);

    const increaseQuantity = () => {
        let temp = amount;
        temp++;
        setAmount(temp);
        setTotalPrice(formatDecimal(item.price * temp));
        if(handleCartChange){
            handleCartChange(item,temp);
        }
        if(parentCallBack){
            parentCallBack();
        }
    }

    const decreaseQuantity = () => {
        let temp = amount;
        if(temp === 1){
            return;
        }
        temp--;
        setAmount(temp);
        setTotalPrice(formatDecimal(item.price * temp));
        if(handleCartChange){
            handleCartChange(item,temp);
        }
        if(parentCallBack){
            parentCallBack();
        }
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let temp = event.target.value;
        if(!isNaN(+temp)){
            setAmount(Number(temp));
            setTotalPrice(formatDecimal(item.price * Number(temp)));
            if(handleCartChange){
                handleCartChange(item,Number(temp));
            }
            if(parentCallBack){
                parentCallBack();
            }
        }
    }

    const checkWordLength = () => {
        //add "-" and space when word is too long
    }

    const removeFromCart = () => {
        if(handleCartChange){
            handleCartChange(item,0);
        }
        if(parentCallBack){
            parentCallBack();
        }
    }

    return (
        <div className="sub-container">
            <div className="cart-columns">
                <div onClick = {removeFromCart} className = "flex justify-center items-center cursor-pointer hover:text-red-500"><VscChromeClose/></div>
                <div className="flex justify-center items-center">
                    <img className= "h-24" alt = "No content" src={item.previewImage ? 'data:image/jpeg;base64,' + item.previewImage : "https://i.pinimg.com/originals/c8/bd/a9/c8bda99ff35a1aca879a77d8dfb84dd2.jpg"}/>
                </div>
                <div className="flex justify-center items-center break-before-auto">{item.name}</div>
                <div className="flex justify-center items-center">{item.price} zł</div>
                <div className="flex justify-center items-center">
                    <div className="flex flex-row">
                        <div className = "cursor-pointer select-none" onClick = {decreaseQuantity}>
                            -
                        </div>
                        <div className="mx-2 w-4">
                            <input onChange={(event) => handleQuantityChange(event)} value={amount}></input>
                        </div>
                        <div className = "cursor-pointer select-none" onClick = {increaseQuantity}>
                            +
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">{totalPrice} zł</div>
            </div>
            <div className="cart-divider"></div>
        </div>
    );
}

export default CartItem;