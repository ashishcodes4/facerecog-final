import React from 'react';

const Form = ({ onInputChange, onButtonSubmit }) => {
    return(
        <section className="form">
            <div className="text">
                <p>Enter the image link in the field below... very soon we would have the ability to upload images directly from the device</p>
            </div>
            <div className="field">
                <input type="text" onChange={ onInputChange } />
                <button type="submit" onClick={ onButtonSubmit } >Submit</button>
            </div>
        </section>
    );
}

export default Form;
