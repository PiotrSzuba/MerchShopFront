import React, {FC,useState, useEffect} from "react";
import axios from "axios";

const Account:FC = () => {

    const [dummy,setDummy]  = useState();

    useEffect(() => {
        test();
    });
    const test = () =>
    {
        axios.get('http://localhost:8000/water')
        .then(res => {
            console.log(res.data);
        });
    }

    return(
        <div className="main-container">
            TBD Account
        </div>
    );
}

export default Account;