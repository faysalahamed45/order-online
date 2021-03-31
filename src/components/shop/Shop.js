import React, { useContext, useEffect, useState } from 'react';
import Carts from '../Carts/Carts';
import Product from '../product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { userCreate } from '../../App';

const Shop = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userCreate);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://vast-shelf-51878.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const savecart = getDatabaseCart();
        const productkey = Object.keys(savecart);
        console.log(products, productkey);
        fetch('https://vast-shelf-51878.herokuapp.com/productsBuyKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productkey)
        })
            .then(res => res.json())
            .then(data => setCart(data))

    }, [])
    console.log(cart);
    const handleAddProduct = (product) => {
        const sameproduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameproduct) {
            count = sameproduct.quantity + 1;
            sameproduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameproduct];
            setCart(newCart);
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
            setCart(newCart);
        };
        addToDatabaseCart(product.key, count);
    };
    return (
        <div>
            <Header userName={loggedInUser.name} success={loggedInUser.success}></Header>
            <div className="shop-containe">
                <div className="product-container">

                    {
                        products.map(pd => <Product product={pd} handleAddProduct={handleAddProduct} showAddToCart={true} key={pd.key}></Product>)
                    }

                </div>
                <div className="cart-container">
                    <Carts carts={cart}>
                        <Link to="/order"><button className="crt-btn">overview</button></Link>
                    </Carts>
                </div>
            </div>
        </div>
    );
};

export default Shop;