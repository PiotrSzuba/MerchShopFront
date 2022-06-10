import React, { useState,useEffect, FC } from 'react';
import ItemCardView from '../components/itemCardView';
import axios from 'axios';
import { GenericItem } from '../types';
import "../index.css"
import {VscSettings} from 'react-icons/vsc';
import ReactLoading from 'react-loading';

const Home:FC = () => {
    document.title = "MerchShop";
    const [genericItems,setGenericItems] = useState<GenericItem[]>([]);

    useEffect(() => {
    //window.scroll(0,0);
    axios.get('https://localhost:7159/api/GenericItems/')
        .then(res => {
          setGenericItems(res.data);
        })
    }, []);

    return(
    <div className="main-container ">
        <div className="sub-container">
            {genericItems.length === 0 &&
            <div className='flex justify-center w-full h-full'>
                <ReactLoading type={"spin"} color={"#001111"} height={"20%"} width={"20%"} />
            </div>
            }
            <div className = "main-grid gap-4">
                {genericItems.map((item,index) => 
                    <ItemCardView key = {index} genericItemId = {item.genericItemId} itemDetailsId={item.itemDetailsId} name={item.name} price={item.price} previewImage={item.previewImage}/>)
                }
            </div>
        </div>
    </div>
    );
}

export default Home;