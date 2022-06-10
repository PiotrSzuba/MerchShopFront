import React, {FC,useState, useEffect, useContext} from "react";
import { Image } from "../types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface Props {
    images: Image[];
  }

const DynamicCarousel = ({images}:Props) => {
    const [caruselImages,setCaruselImages] = useState<Image[]>();
    const [selectedImage,setSelectedImage] = useState<number>(0);
    const imageActive = "brightness-100 ";
    const imageNotActive = "brightness-70 hover:brightness-100 cursor-pointer";

    useEffect(() => {
      setCaruselImages(images);
    },[images]);

    const activateImage = (id:number) => {
        if(images === undefined){
          return;
        }
        let tempImages = images;
        for(let i = 0; i < tempImages.length; i++){
          tempImages[i].active = false;
          tempImages[i].className = imageNotActive;
        }
        tempImages[id].active = true;
        tempImages[id].className = imageActive;    
        setCaruselImages(tempImages);
        setSelectedImage(id);
      }

    return (
        <div>
            { caruselImages !== undefined && caruselImages.length >= 0 &&
                <Carousel showThumbs={false} selectedItem={selectedImage} showStatus={false} showArrows={false} showIndicators={false}> 
                {caruselImages.map((image,index) =>
                    <img key = {index} className = {imageActive}  alt = "No content" src = {image.imageLink}/>
                )}
                </Carousel>
            }         
            <div className=" grid grid-cols-4 gap-1 mt-2">
            {caruselImages !== undefined && caruselImages.length >= 0 && caruselImages.map((image,index) =>
                <img key = {index} onClick = {() => activateImage(index)} className = {image.className}  alt = "No content" src = {image.imageLink}/>
            )}             
            </div>
        </div>
    );
}

export default DynamicCarousel;