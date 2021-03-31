import React from 'react';
import './Carts.css';

const Carts = (props) => {
    const cart=props.carts;
    console.log(cart);
    
    // const total = cart.reduce((total,prd)=>total+prd.price*prd.quantity || 1 ,0)
    // console.log(total);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        product.quantity = 1;
        total = total+product.price*product.quantity;
        
    }
    let shiping = 0;
    
    if(total>35){
       shiping=0;
    }
    else if(total>15){
        shiping=4.99;
    }
    else if(total>0){
        shiping=12.99;
    }
    const tax = total/10;
    const formatNumber = number=>{
        const parse=number.toFixed(2);
        return parse;
    }
    return (
        <div className='cart-component'>
            <h3>Order Summary</h3>
            <p>Items Ordered:{cart.length}</p>
            <p>Price:{formatNumber(total)}</p>
            <p>shiping:{formatNumber(shiping)}</p>
            <p><small>Vat+Tax:{formatNumber(tax)}</small></p>
            <p>total:{formatNumber(total+shiping+tax)}</p>
             {
                 props.children
             }
        </div>
    );
};
export default Carts;