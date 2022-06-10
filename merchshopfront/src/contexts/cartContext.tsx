import React from 'react';
import { cartItem,GenericItem,ItemView } from '../types';

interface ICartContext {
    cartItems: cartItem[]
    handleCartChange?: (itemProps?:GenericItem,quantity?:number) => void;
}

const defaultState = {
    cartItems: [],
};

export const cartContext = React.createContext<ICartContext>(defaultState);