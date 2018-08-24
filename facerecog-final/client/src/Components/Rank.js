import React from 'react';

const Rank = ({ name, entries }) => {
    return(
        <div>
        <h3>Hey{this.props.name}, Your current rank is:</h3>
        
        <p>{this.props.entries}</p>
        </div>
    );
}

export default Rank;
