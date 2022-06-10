import React, {FC,useState, useEffect} from "react";
import axios from 'axios';
import { ItemView } from "../types";
import CrudItem from "../components/crudItem";

const UpdateItem:FC = () => {

    const getId = () => {
        return window.location.pathname.replace("/updateItem/","");
    }

    const [item,setItem] = useState<ItemView>();

    useEffect(() => {
        axios.get('https://localhost:7159/api/GenericItems/' + getId())
        .then(res => {
          if(res.data){
            const temp = res.data;
            setItem(temp);
            document.title = temp.name + "Update";
            
          }
        });
    },[]);

    return(
        <div>
            { item === undefined &&
                <div className="main-container"></div>
            }

        {item !== undefined &&
            <CrudItem item={item} />
        }
        </div>
    );
}

export default UpdateItem;