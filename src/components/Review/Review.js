import React, { useContext, useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Carts from '../Carts/Carts';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';
import Header from '../Header/Header';
import { userCreate } from '../../App';

const Review = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userCreate);
    const [cart, setCart] = useState([]);
    const [orderplace, setOrderplace] = useState(false);
    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment')
    }
    const handleremove = (productkey) => {
        const newCard = cart.filter(pd => pd.key !== productkey);
        setCart(newCard);
        removeFromDatabaseCart(productkey);
    }
    useEffect(() => {
        const savedcart = getDatabaseCart();
        const productkey = Object.keys(savedcart);
        fetch('https://vast-shelf-51878.herokuapp.com/productsBuyKey', {
            method: 'POST',
            headers: {
                'quantity': 1,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productkey)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, []);
    let thankyou;
    if (orderplace) {
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div>
            <Header userName={loggedInUser.name} success={loggedInUser.success}></Header>
            <div className="shop-containe">
                <div className="product-container">
                    {
                        cart.map(pd => <ReviewItem product={pd} handleremove={handleremove}></ReviewItem>)
                    }
                    {thankyou}
                </div>

                <div className="cart-container">
                    <Carts carts={cart}><button onClick={handleProceedCheckout} className="crt-btn">Proceed Checkout</button></Carts>
                </div>
            </div>
        </div>
    );
};

export default Review;