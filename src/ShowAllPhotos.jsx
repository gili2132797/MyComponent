import React, { useState, useTransition } from "react";
import Button from '@mui/material/Button';

function ShowAllPhotos() {
  const [photos, setPhotos] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [buttonPhotos, setButtonPhotos] = useState(true);

  const showPhotos = () => {
   try{ 
    setButtonPhotos(false);
    startTransition(() => {
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then(response => response.json())
        .then(data => {
          setPhotos(data);
          setButtonPhotos(true);
        });
    });
   } 
   catch(error){
    console.log(error)
   } 
  };


  return (
    <div>
      <Button variant="outlined" onClick={showPhotos} disabled={!buttonPhotos || isPending}>
      {isPending ? "Loading..." : "show photo"}
      </Button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {photos.map(photo => (
          <img
            key={photo.id}
            src={photo.thumbnailUrl}
            alt={photo.title}
            style={{ width: "250px", height: "250px", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowAllPhotos;