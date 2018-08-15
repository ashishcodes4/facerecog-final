import React from 'react';
import './OutputImage.css';


const OutputImage = ({ imageUrl, box }) => {
  return (
   <div className="center ma">
     <div className="absolute mt2">
       {imageUrl ? <img src={imageUrl} alt="input" id="input-image" width='500px' height='auto' /> : null}
       <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} ></div>
     </div>
   </div>
  );
}

export default OutputImage;