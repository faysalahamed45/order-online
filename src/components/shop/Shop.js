import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userCreate } from '../../App';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Carts from '../Carts/Carts';
import Header from '../Header/Header';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userCreate);
    const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [search, setSearch] = useState(' ');

	useEffect(() => {
		// fetch('https://vast-shelf-51878.herokuapp.com/products')
		fetch('https://vast-shelf-51878.herokuapp.com/products?search=' + search)
			.then(res => res.json())
			.then(data => setProducts(data))
	}, [search]);
	console.log(setProducts);
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

	}, []);
	const handleSearch = event => {
		setSearch(event.target.value);
	}
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
						<input type="text" name="" id="" onBlur={handleSearch}/>

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