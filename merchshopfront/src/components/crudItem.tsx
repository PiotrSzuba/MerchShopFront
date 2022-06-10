import React, {FC,useState, useEffect} from "react";
import axios from 'axios';
import { GenericItem, Image, ItemView, SizeOption } from "../types";
import DynamicCarousel from "../components/dynamicCarousel";
import {ImBin} from "react-icons/im"
import ReactLoading from 'react-loading';

type description = {
    present: boolean;
    value: string;
}

interface props {
    item: ItemView | undefined;
}

interface sizeOptions {
    boxes: SizeOption[];
    set: boolean;
}

const CrudItem:FC<props | undefined> = (props:props | undefined) => {
    const [name,setName] = useState<string>("");
    const [price,setPrice] = useState<string>("");
    const [description,setDescription] = useState<description>({present:false, value:""});
    const [featureList,setFeatureList] = useState<string[]>([]);
    const [designerList,setDesignerList] = useState<string[]>([]);
    const [images,setImages] = useState<Image[]>([]);
    const [category, setCategory] = useState<string>("");
    const [sizeOptions, setSizeOptions] = useState<sizeOptions>();
    const [visible,setVisible] = useState<boolean>(false);
    const [errorVisible, setErrorVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        window.scroll(0,0);
        if(props && props.item){
            setName(props.item.name);
            setPrice(props.item.price.toString());
            if(props.item.mainDescription){
                setDescription({present:false,value:props.item.mainDescription});
            }
            if(props.item.features){
                setFeatureList(props.item.features);
            }
            if(props.item.designers){
                setDesignerList(props.item.designers);
            }
            if(props.item.images && props.item.images.length >= 0) {
                let newImages:Image[] = [];
                for(let i = 0; i < props.item.images.length; i++){
                  newImages.push({imageLink:props.item.images[i],active:false,className: "brightness-70 hover:brightness-100"});
                }
                newImages[0].active = true;
                newImages[0].className = "brightness-100";
                setImages(newImages);
            }
            if(props.item.category){
                setCategory(props.item.category);
            }
        }
    }, []);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files){
            return;
        }
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if(reader.result){
                addImage(reader.result.toString());
            }
        };
    }

    const addImage = (base64: string) => {
        const image:Image = Object.assign({},{imageLink: base64, active:false,className: "brightness-70 hover:brightness-100"});
        setImages([...images,image]);
    }

    const deleteImage = () => {
        let tempImages = images;
        for(let i = 0; i < tempImages.length; i++){
            if(tempImages[i].active === true){
                tempImages.splice(i, 1);
                if(tempImages.length ===1){
                    tempImages[0].active = true;
                }
                //setImages(tempImages);
                setVisible(true);
                setTimeout(() => {
                    setVisible(false);
                  }, 1);

                return;
            }
        }
    }

    const handleNameChange = (value:string) => {
        setName(value);
    }

    const handlePriceChange = (value:string) => {
        value = value.replace(",",".");
        const floatingPoint = value.substring(value.indexOf('.') + 1);
        if(floatingPoint.length > 2 && value.indexOf('.') > -1){
            return;
        }
        let number:number = Number(value);
        if(Number.isNaN(number)){
            return;
        }
        setPrice(value);
    }

    const handleDescriptionArea = ({present,value}:description) => {
        setDescription({present:present,value:value});
    }

    const addFeature = () => {
        setFeatureList([...featureList,""]);
    }

    const deleteFeature = (index: number) => {
        if(featureList.length === 1){
            setFeatureList([]);
            return;
        }
        const newList = featureList.filter((feature) => feature !== featureList[index] );
        setFeatureList(newList);
    }

    const deleteAllFeatures = () => {
        setFeatureList([]);
    }

    const handleFeatureInput = (event:React.ChangeEvent<HTMLTextAreaElement>,index:number) => {
        const newFeatureList:string[] = [...featureList];
        newFeatureList[index] = event.target.value;
        setFeatureList(newFeatureList);
    }

    const addDesigner = () => {
        setDesignerList([...designerList,""]);
    }

    const handleDesignerInput = (event:React.ChangeEvent<HTMLTextAreaElement>,index:number) => {
        const newDesignerList:string[] = [...designerList];
        newDesignerList[index] = event.target.value;
        setDesignerList(newDesignerList);
    }

    const deleteDesigner = (index: number) => {
        if(designerList.length === 1){
            setDesignerList([]);
            return;
        }
        const newList = designerList.filter((designer) => designer !== designerList[index] );
        setDesignerList(newList);
    }

    const deleteDesigners = () => {
        setDesignerList([]);
    }

    const showError = (message:string) => {
        setErrorMessage(message);
        setErrorVisible(true);
        setTimeout(() => {
            setErrorVisible(false);
            setErrorMessage("");
          }, 2000);
    }

    const addToDatabase = () => {
        if(name.length === 0){
            showError("Choose name for the product");
            return;
        }
        if(price.length === 0){
            showError("Specify price");
            return;
        }
        if(images.length === 0){
            showError("No image was uploaded");
            return;
        }

        let base64Images:string[] = images.map((image) => image.imageLink.split(',')[1]);
        let previewImage:string = base64Images[0];

        let itemView:ItemView = {
            id: props?.item ? props.item.id : 0,
            itemDetailsId: props?.item?.itemDetailsId ? props.item.itemDetailsId : 0,
            name: name,
            price:Number(price),
            onDiscount: false,
            discountValue: props?.item?.discountValue ? props.item.discountValue : 0,
            isInStock: true,
            previewImage: previewImage,
            sizes: props?.item?.sizes ? props.item.sizes : [],
            mainDescription: description.value,
            features: featureList,
            designers: designerList,
            images:base64Images,
            category: props?.item?.category ? props.item.category : "",
            details: props?.item?.details ? props.item.details : [],
            additionalInformation: props?.item?.additionalInformation ? props.item.additionalInformation : [],
        };

        if(props && props.item){
            axios.put('https://localhost:7159/api/GenericItems/' + props.item.id, itemView)
            .then(res => {
                console.log(res.data);
            })

            return;
        }
        axios.post('https://localhost:7159/api/GenericItems/' , itemView)
        .then(res => {
          console.log(res.data);
        })

        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            setName("");
            setPrice("");
            setDescription({present:false, value:""});
            setFeatureList([]);
            setDesignerList([]);
            setImages([]);
          }, 2000);
      }

    document.title = "Add item - Merch shop";
    return (
        <div className="main-container">
            <div className="flex felx-row mt-4 m-auto">
                <div className = "w-4/12 flex flex-col">
                {images && images.length >= 1 &&
                    <DynamicCarousel images={images} />
                }  
                    <label htmlFor="file-upload" className="btn-black mt-4" >
                        <i className="fa fa-cloud-upload"></i> Add image
                    </label>
                    <input id="file-upload" type="file" multiple={false} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e)}></input>
                    { images.length > 0 && 
                        <div className = "btn-black-error my-4" onClick={() => deleteImage()}>Delete selected image</div>
                    }
                </div>
                <div className = "flex flex-col ml-auto w-7/12">
                    <input className = "text-4xl text-white-800 font-semibold" placeholder="Name" value={name} onChange={(e) => handleNameChange(e.target.value)}></input>
                    <div className="flex flex-row">
                        <input className="text-2xl mt-4 w-24" placeholder="Price" value={price} onChange={(e) => handlePriceChange(e.target.value)}></input>
                        <p className="mt-4 text-2xl">zł</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="mt-4 text-2xl mr-2">Stock:</p>
                        <input className="text-2xl mt-4" placeholder="Place number of items"></input>
                    </div>
                    {!description.present && 
                        <div className="btn-black mt-12" onClick={() => handleDescriptionArea({present:true,value:""})}>Add description</div>
                    }
                    {description.present && 
                    <>
                        <div className="text-xl font-semibold mt-12"> PRODUCT DESCRIPTION</div>
                        <textarea className = "textArea h-40" placeholder = "Description" value={description.value} onChange={(e) => handleDescriptionArea({present:true,value:e.target.value})}/>
                        <div className="btn-black-error mt-8" onClick={() => handleDescriptionArea({present:false,value:""})}>Delete description</div>
                    </>
                    }
                    {featureList.length === 0 &&
                        <div className="btn-black mt-12" onClick={() => addFeature()}>Add features</div>
                    }
                    {featureList.length !== 0 &&
                    <>
                        <div className="text-xl font-semibold mt-12 mb-4">Features</div>
                        {featureList.map((item,index) => 
                            <div key={index} className="flex flex-row">
                                <textarea className = "textArea ml-8 h-20" placeholder = "Feature" value={featureList[index]} onChange={(event) => handleFeatureInput(event,index)}/> 
                                <div className="flex text-red-500 cursor-pointer items-center ml-4">
                                    <div onClick={() => deleteFeature(index)}><ImBin /></div>
                                </div>
                            </div>)
                        }
                        <div className="btn-black mt-8" onClick={() => addFeature()}>Add feature</div>
                        <div className="btn-black-error mt-8" onClick={() => deleteAllFeatures()}>Delete all features</div>
                    </>
                    }
                    {designerList.length === 0 &&
                        <div className="btn-black mt-12" onClick={() => addDesigner()}>Add designers</div>
                    }
                    {designerList.length !== 0 &&
                    <>
                        <div className="text-xl font-semibold mt-12 mb-4">GRAPHICS DESIGN BY</div>
                    {designerList.map((item,index) => 
                        < div key={index} className="flex flex-row">
                            <textarea className = "textArea ml-8 h-20" placeholder = "Designer" value={designerList[index]} onChange={(event) => handleDesignerInput(event,index)}/> 
                            <div className="flex text-red-500 cursor-pointer items-center ml-4">
                                <div onClick={() => deleteDesigner(index)}><ImBin /></div>
                            </div>
                        </div>)
                    }
                        <div className="btn-black mt-8" onClick={() => addDesigner()}>Add designer</div>
                        <div className="btn-black-error mt-8" onClick={() => deleteDesigners()}>Delete designers</div>
                    </>
                    }
                </div>
            </div>
            <div className = "btn-black mt-24 my-4" onClick={() => addToDatabase()}>{props && props.item ? "Update item" : "Add item"}</div>
                { visible && !errorVisible &&
                    <div className=" text-center">
                        {props && props.item ? "Item updated" : "Item added"}
                    </div>
                }
                { errorVisible &&
                    <div className=" text-center text-red-500">
                        {errorMessage}
                    </div>
                }
        </div>
    );
}

export default CrudItem;