import React, {FC,useState, useEffect} from "react";
import axios from 'axios';
import { GenericItem, Image, ItemView } from "../types";
import {ImBin} from "react-icons/im"
import { VscChromeClose, VscEdit } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
import { RiAddCircleLine } from "react-icons/ri";

const ManageItems:FC = () => {

    document.title = "MerchShop - Item manager";
    let navigate = useNavigate(); 
    
    const [genericItems,setGenericItems] = useState<GenericItem[]>([]);

    useEffect(() => {
    window.scroll(0,0);
    axios.get('https://localhost:7159/api/GenericItems/')
        .then(res => {
          setGenericItems(res.data);
        })
    }, []);

    const deleteItem = (id:number | undefined) => {
        axios.delete('https://localhost:7159/api/GenericItems/' + id).then(res => {
            const newGenericItems = genericItems.filter((item) => id !== item.genericItemId);
            setGenericItems(newGenericItems);
        })
    }

    return(
        <div className="main-container">
            <div className="sub-container">
                <div className="btn-black flex mb-16" onClick={() => navigate("/AddItem")}>
                    <div className='my-auto mx-auto flex flex-row'>
                        <RiAddCircleLine className="my-auto mr-1" />Add item
                    </div>
                </div>
                <div className="flex flex-col">
                    <table>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        { genericItems && genericItems.map((item,index) => 
                        <tr key={index}>
                            <td className="cursor-pointer" onClick={() => navigate("/Item/" + item.genericItemId)}>
                                <img src={item.previewImage ? 'data:image/jpeg;base64,' + item.previewImage : "https://i.pinimg.com/originals/c8/bd/a9/c8bda99ff35a1aca879a77d8dfb84dd2.jpg"} className="h-32 mx-auto"></img>
                            </td>
                            <td className="cursor-pointer" onClick={() => navigate("/Item/" + item.genericItemId)}>{item.name}</td>
                            <td className="cursor-pointer" onClick={() => navigate("/Item/" + item.genericItemId)}>{item.price} zł</td>
                            <td>
                                <div className="flex flex-row">
                                    <VscEdit className='my-auto mx-auto cursor-pointer text-blue-400' onClick={()=> navigate("/updateItem/" + item.genericItemId)}/>
                                    <VscChromeClose className='my-auto mx-auto cursor-pointer text-red-500' onClick={() => deleteItem(item.genericItemId)}/>
                                </div>
                            </td>
                        </tr>
                    )}
                    </table>
                    {genericItems.length === 0 &&
                        <div className='flex justify-center w-full h-full mt-32'>
                            <ReactLoading type={"spin"} color={"#001111"} height={"20%"} width={"20%"} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ManageItems;