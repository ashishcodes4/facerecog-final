import React from 'react';

const OutputImage = ({imageUrl}) => {
    return(
        <div className="output-image">
            {imageUrl ?  <img src={imageUrl} alt="input"/> : null}
        </div>
    );
}

export default OutputImage;
