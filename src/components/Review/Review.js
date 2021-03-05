import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Carts from '../Carts/Carts';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
   const [orderplace,setOrderplace] = useState(false);
    const handleOderPlace=()=>{
        console.log("order placed");
        setCart([]);
        setOrderplace(true);
        processOrder();
    }
    const handleremove = (productkey) => {
        const newCard = cart.filter(pd => pd.key !== productkey);
        setCart(newCard);
        removeFromDatabaseCart(productkey);
    }
    useEffect(() => {
        const savedcart = getDatabaseCart();
        const productkeys = Object.keys(savedcart);
        const cartProduct = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedcart[key];
            return product;
        });
        setCart(cartProduct);
    }, []);
    let thankyou;
    if(orderplace){
        thankyou=<img src={happyImage} alt=""/>
    }
    return (
        <div className="shop-containe">
            <div className="product-container">
                {/* <h1>product detils</h1>
                <h1>{cart.length}</h1> */}
                {
                    cart.map(pd => <ReviewItem product={pd} handleremove={handleremove}></ReviewItem>)
                }
                {thankyou}
            </div>
            
            <div className="cart-container">
            <Carts carts={cart}><button onClick={handleOderPlace}className="crt-btn">Order Place</button></Carts>
            </div>
        </div>
    );
};

export default Review;