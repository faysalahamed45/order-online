import React from 'react';
import Carts from '../Carts/Carts';

const ReviewItem = (props) => {
    const { img, name, quantity, key, price } = props.product;
    console.log(props.product, key);
    const style = {
        borderBottom: '1px solid lightgray',
        padding: '5px',
        marginLeft: '200px'
    }
    return (
        // <div style={style} >
        //    <h4>this is faysal</h4>
        // <h1>{name}</h1>
        // <p>{quantity}</p>
        // <p><small>${price}</small></p>
        // <button onClick={()=>props.handleremove(key)} className="crt-btn">remove</button>  
        // </div>

        <div className="product-site">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h3>{name}</h3>
                <p>{quantity}</p>
                <p><small>${price}</small></p>
                <button onClick={() => props.handleremove(key)} className="crt-btn">remove</button> 
             </div>
        </div>


    );
};

export default ReviewItem;