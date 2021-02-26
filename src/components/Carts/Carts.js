import React from 'react';

const Carts = (props) => {
    const cart=props.carts;
    const total = cart.reduce((total,prd)=>total+prd.price,0)
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
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered:{cart.length}</p>
            <p>Price:{formatNumber(total)}</p>
            <p>shiping:{formatNumber(shiping)}</p>
            <p><small>Vat+Tax:{formatNumber(tax)}</small></p>
            <p>total:{formatNumber(total+shiping+tax)}</p>
        </div>
    );
};
export default Carts;