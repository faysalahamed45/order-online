import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom'


const Product = (props) => {
    const { name, img, stock, price, seller, key, showAddToCart } = props.product;
    // console.log(key);
    return (
        <div className="product-site">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <p><Link to={"/product/" + key}>{name}</Link></p>
                <br />
                <p><small>by:{seller}</small></p>
                <br />
                <p>${price}</p>
                <p><small>Only{stock} left in stock-Order soon</small></p>
                {props.showAddToCart && <button className="crt-btn" onClick={() => props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart}/> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;