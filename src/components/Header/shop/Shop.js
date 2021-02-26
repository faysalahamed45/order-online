import React, { useState } from 'react';
 import fakeData from '../../../fakeData';
import Carts from '../../Carts/Carts';
import Product from '../product/Product';
 import './Shop.css';

const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [product,setProduct]=useState(first10);
    const [cart,setCard]=useState([]);
    const handleAddProduct=(product)=>{
        console.log("added products",product);
        const newCard=[...cart,product];
        setCard(newCard);
    }
    return (
        <div className="shop-containe">
           <div className="product-container">
        
            {
                product.map(pd=><Product product={pd} handleAddProduct={handleAddProduct}></Product>)
            } 
           
           </div>
           <div className="cart-container">
               <Carts carts ={cart}></Carts>
           </div>
        </div>
    );
};

export default Shop;