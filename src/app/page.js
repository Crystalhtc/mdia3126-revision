"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  //Todo
  
  // button that fetches
  // container for button
  // container for displaying content (empty, loading, fulfilled state)
  // fetch content (handle and format content)
  // loading state
  // error handling
  // styling
  // breakpoints (mobile first)
  // function to clear data

  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);

  async function fetchImages() {
    // console.log("button clicked");
    // alert("button clicked");

    if (imageData) {
      // Clear the data if images are already loaded
      setImageData(null);
      return;
    }
    
    const randomPage = Math.floor(Math.random() * 50) + 1;
    const API_URL = `https://api.jikan.moe/v4/anime?page=${randomPage}&limit=5`;
    setLoading(true);
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    // const debuggerVar = "test var";
    // const moreDebuggerVar = "another test var";
    setImageData(data.data);
    setLoading(false);

  }

  const Header = () => {
    return (
      <section>
        <h1>Midterm App</h1>
        <button 
          className="border-2 border-black p-2" 
          onClick={fetchImages}>
            Fetch 📸
        </button>
      </section>
    )
  }

  const ImageListContainer =() => {

    if (loading) {
      return (
        <section>loading...</section>
      )
    }

    if(imageData) {
      const imageListItems = [];
      // the image data should be an array of objects
      // the forEach gives an error -> check if the data is an array
      imageData.forEach((image,i) => {
        // author: 
        // "Alejandro Escamilla"
        // download_url: 
        // "https://picsum.photos/id/0/5000/3333"
        // height: 
        // 3333
        // id: 
        // "0"
        // url: 
        // "https://unsplash.com/photos/yC-Yzbqy7PY"
        // width: 
        // 5000`

          imageListItems.push(
            <article key={image.id} className="flex justify-items-center items-center gap-3">
              <img src={image.images.jpg.image_url} width="200"/>
              <div className="flex flex-col">
                <p>Author: {image.title}</p>
                <p>Duration: {image.duration}</p>
                <p>{image.synopsis}</p>
              </div>
              
              <hr/>
            </article>
          )
      });
      return <section className="flex flex-col items-center bg-teal-100 gap-10" >{imageListItems}</section>;
    }

    return (
      <section>no images fetched! ☹️</section>
    )
  }

  return (
    <div className="m-2">
      <Header/>
      <ImageListContainer/>
    </div>
  );
}