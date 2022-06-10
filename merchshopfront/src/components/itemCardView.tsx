import React, { useState,useContext, useEffect, FC } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GenericItem } from '../types';
import axios from 'axios';
import "../index.css"

const ItemCardView:FC<GenericItem> = ({genericItemId,itemDetailsId,previewImage,name,price}: GenericItem) => {

    const formatDecimal = (price:number):string => {
        return price.toLocaleString("en",{useGrouping: false,minimumFractionDigits: 2});
    }

    return(
        <div className='m-auto'>
            <div className='card-container'>
                <NavLink className = "navlink-stripper" to = {"Item/" + genericItemId}>
                    <img className= "card-photo" alt = "No content" src={previewImage ? 'data:image/jpeg;base64,' + previewImage : "https://i.pinimg.com/originals/c8/bd/a9/c8bda99ff35a1aca879a77d8dfb84dd2.jpg"}/>
                    <div className="card-description font-medium"> 
                        <div className='text-center'>
                            {name}
                        </div>
                        <div className="text-center">
                            {formatDecimal(price)} zł
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default ItemCardView;