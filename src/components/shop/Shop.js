import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import Carts from '../Carts/Carts';
import Product from '../product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first10);
    const [cart, setCard] = useState([]);
    useEffect(()=>{
        const savecart = getDatabaseCart();
        const productkey=Object.keys(savecart);
        const previuskey = productkey.map(pdkey=>{
            const product = fakeData.find(pd=>pd.key===pdkey);
            product.quantity= savecart[pdkey];
            return product;
        })
       setCard(previuskey);
    },[])
    const handleAddProduct = (product) => {
        //console.log("added products", product);
        const sameproduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameproduct){
            count = sameproduct.quantity + 1;
            sameproduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameproduct];
            setCard(newCart);
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
            setCard(newCart);
        };
        addToDatabaseCart(product.key, count);
    };
    return (
        <div className="shop-containe">
            <div className="product-container">

                {
                    product.map(pd => <Product product={pd} handleAddProduct={handleAddProduct} showAddToCart={true} key={pd.key}></Product>)
                }

            </div>
            <div className="cart-container">
                <Carts carts={cart}>
                <Link to="/order"><button className="crt-btn">overview</button></Link>
                </Carts>
            </div>
        </div>
    );
};

export default Shop;