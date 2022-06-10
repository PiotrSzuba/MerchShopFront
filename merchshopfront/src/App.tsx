import React, { Suspense, useState} from 'react';
import "./index.css";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import Navbar from './components/navbar'
import Footer from './components/footer';
import Home from './pages/Home';
import Item from './pages/item';
import Cart from './pages/cart';
import Account from './pages/account';
import { cartItem, GenericItem, ItemView } from './types';
import { cartContext } from './contexts/cartContext';
import Statistics from './pages/statistics';
import UpdateItem from './pages/updateItem';
import ManageItems from './pages/manageItems';
import CrudItem from './components/crudItem';

const App = () => {
  const [cartItems,setCartItems] = useState<cartItem[]>([]);

  const handleCartChange = (itemProps?:GenericItem,quantity?:number) => {
    console.log("WEJSCIE: props",itemProps, " quantity" , quantity);
    console.log("WEJSCIE: cartItems: ", cartItems);
    let tempList = cartItems;
    let itemIndex = -1;
    if(quantity === undefined){
      setCartItems([]);
      return;
    }
    if(itemProps === undefined){
      setCartItems([]);
      return;
    } 
    console.log("Przed for: tempList: ", tempList);
    console.log("Przed for: cartItems: ", cartItems);
    for(let i = 0; i < tempList.length; i++){
      if(tempList[i].item.genericItemId === itemProps.genericItemId){
        itemIndex = i;
        break;
      }
    }
    console.log("index: ",itemIndex);
    if(itemIndex > -1){
      if(quantity === 0){
        tempList.splice(itemIndex,1);
        setCartItems(tempList);
        return;
      }
      tempList[itemIndex].quantity = quantity;
    }
    else{
      tempList.push({item: itemProps,quantity: quantity });
    }
    console.log("result: ", tempList);
    setCartItems(tempList);
  };

  return (
  <cartContext.Provider value = {{cartItems,handleCartChange}} >

  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Item/:id" element={<Item />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/AddItem" element={<CrudItem item={undefined} />} />
      <Route path="/UpdateItem/:id" element={<UpdateItem />} />
      <Route path="/ManageItems" element={<ManageItems />} />
      <Route path="/Statistics" element={<Statistics />} />
      <Route path="/Account" element={<Account />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  </cartContext.Provider>
  )
}

export default App
