import axios from "axios";
import React, {FC,useState, useEffect, useContext} from "react";
import { GenericItem, Image, ItemView, SizeOption } from "../types";
import "../index.css"
import { cartContext } from "../contexts/cartContext";
import DynamicCarousel from "../components/dynamicCarousel";
import ReactLoading from 'react-loading';

interface sizeOptions {
  boxes: SizeOption[];
  set: boolean;
}

const Item:FC = () => {

    const {cartItems,handleCartChange} = useContext(cartContext);
    const [itemDetails,setItemDetails] = useState<ItemView>();
    const [visible,setVisible] = useState(false);
    const [dummy,setDummy] = useState(false);
    const [image,setImage] = useState("https://i.pinimg.com/originals/c8/bd/a9/c8bda99ff35a1aca879a77d8dfb84dd2.jpg");
    const [images,setImages] = useState<Image[]>([]);
    const [sizeOptions, setSizeOptions] = useState<sizeOptions>();
    const inActiveClassName = "border rounded-lg p-1 w-12 cursor-pointer text-center border-white-600 text-black-900 border-2";
    const activeClassName = "border rounded-lg p-1 w-12 cursor-pointer text-center border-black-900 border-2";
    const noStockClassName = "border rounded-lg p-1 w-12 cursor-pointer text-center border-white-600 text-white-600 border-2";

    const formatDecimal = (price:number):string => {
      return price.toLocaleString("en",{useGrouping: false,minimumFractionDigits: 2});
    }

    const sizesList = (sizes:string[]) => {
      let tempList:SizeOption[] = [];
      for(let i = 0; i < sizes.length; i++){
        tempList.push({name: sizes[i], className: inActiveClassName});
      }
      setSizeOptions({boxes: tempList, set: false});
    }

    const getId = () => {
        return window.location.pathname.replace("/Item/","");
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        let item:ItemView | undefined = undefined;
        if(itemDetails === undefined){
          axios.get('https://localhost:7159/api/GenericItems/' + getId())
          .then(res => {
            item = res.data;
            if(item){
              item.category = "hoodie";
              setItemDetails(item);
              if(item.sizes){
                sizesList(item.sizes);
              }
              if(item.images !== null && item.images !== undefined){
                let newImages:Image[] = [];
                for(let i = 0; i < item.images.length; i++){
                  newImages.push({imageLink:item.images[i],active:false,className: "brightness-70 hover:brightness-100"});
                }
                setImages(newImages);
              }
              document.title = item.name;
              
            }
          });
          if( images.length == 0 || images === undefined){
            let tempImages:Image[] = [];
            for(let i = 0; i < 5; i++){
              tempImages.push({imageLink:image,active:false,className: "brightness-70 hover:brightness-100"});
            }
            setImages(tempImages);
          }
        }
        }, []);
    
    const addToBasket = () => {
      console.log("Przycisk: ",cartItems);
      if(handleCartChange && itemDetails){
        let itemIndex = -1;
        for(let i = 0; i < cartItems.length; i++){
          console.log("CartItem", cartItems[i].item.genericItemId, "===", itemDetails.genericItemId );
          console.log("Item: ", cartItems[i].item.genericItemId);
          if(cartItems[i].item.genericItemId === itemDetails.id){
            itemIndex = i;
            break;
          }
        }
        console.log("INDEX ADD TO: ", itemIndex);
        let newQuantity = 1;
        if(itemIndex > -1){
          newQuantity = cartItems[itemIndex].quantity;
          newQuantity++;
        }
        handleCartChange(itemDetails,newQuantity);
      }
      setVisible(true);
      setTimeout(() => {
          setVisible(false);
        }, 2000);
    }

    const handleSizeChange = (index:number) => {
      if(sizeOptions){
        let boxes:sizeOptions = sizeOptions;
        for(let i = 0; i < sizeOptions.boxes.length; i++){
          boxes.boxes[i].className = inActiveClassName;
        }
        boxes.boxes[index].className = activeClassName;
        setSizeOptions({boxes: boxes.boxes,set:true});
        setDummy(true);
        setTimeout(() => {
          setDummy(false);
          }, 1);
      }
    }

    return(
    <div className="main-container">
      {itemDetails === undefined &&
      <div className='flex justify-center w-full h-full'>
          <ReactLoading type={"spin"} color={"#001111"} height={"20%"} width={"20%"} />
      </div>
      }
      { itemDetails !== undefined &&
        <div className="flex felx-row mt-4 m-auto">
          <div className = "w-4/12 flex flex-col">
            <DynamicCarousel images = {images}/>
          </div> 
          <div className = "flex flex-col ml-auto w-7/12">            
              <div className = "text-5xl text-white-800 font-semibold">{itemDetails.name.toUpperCase()}</div>
              { itemDetails.onDiscount &&
                <div className="flex flex-row">
                  <div className="text-3xl mt-4 mr-2 text-red-500">{formatDecimal(itemDetails.price)} zł</div>
                  <div className="text-3xl mt-4 line-through text-black-200">{formatDecimal(itemDetails.price)} zł</div>
                </div>
              }
              { !itemDetails.onDiscount &&
                <div className="text-3xl mt-4">{formatDecimal(itemDetails.price)} zł</div>
              }
              { itemDetails.mainDescription &&
                <div className="mt-8">
                  <div className="text-xl font-semibold"> PRODUCT DESCRIPTION</div>
                  <div className="mt-4 text-xl"> {itemDetails.mainDescription}</div>
                </div>
              }
              { itemDetails.features && itemDetails.features.length > 0 && 
                <>
                <div className="mt-8 mb-4 text-xl font-semibold">Features</div>
                <ul className="list-disc ml-12">
                { itemDetails.features && itemDetails.features.map((feature, index) => 
                      <li key = {index} className = "mt-1 text-md font-normal">{feature}</li>)
                }
                </ul>
                </>
              }
              { itemDetails.designers && itemDetails.designers.length > 0 &&
                <div> 
                  <div className="mt-8 font-medium text-xl">GRAPHICS DESIGN BY</div>
                  {itemDetails.designers.map((designer,index) =>
                    <div key={index} className="mt-4 ml-8 text-md">{designer}</div>)                 
                  }
                </div>
              }
              { sizeOptions && sizeOptions.boxes.length > 0 &&
              <div className="flex flex-row my-8 text-lg">
                <div className="mr-4 my-auto">Size:</div>
                <div className="grid grid-flow-col gap-1"> 
                  { sizeOptions.boxes.map((item,index) => 
                    <div className={item.className} key={index} onClick={() => handleSizeChange(index)}>{item.name}</div>
                  )}
                </div>
              </div>
              }
              { itemDetails.isInStock && (sizeOptions?.set || sizeOptions?.boxes.length === 0 ) &&
                <div className = "btn-black my-12" onClick={() => addToBasket()}>Add to cart</div>
              }
              { !itemDetails.isInStock && sizeOptions?.set &&
                <div> 
                  <div className = "text-red-500"> Out of stock</div>
                  <div className = "btn-black-inactive my-12">Out of stock</div>
                </div> 
              }
              { sizeOptions && !sizeOptions.set && sizeOptions.boxes.length > 0 &&
                <div className = "btn-black-inactive my-12" >Choose size</div>
              }
              { visible && 
                <div className=" text-center">
                  Added to basket
                </div>
              }
              {itemDetails.category && 
                <div className=" text-sm text-white-700 cursor-pointer ">Category: {itemDetails.category}</div>
              }
          </div>
        </div>
      }
      </div>
    );
}

export default Item;