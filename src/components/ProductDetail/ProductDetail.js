import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../product/Product';
const ProductDetail = () => {
    const { productkey } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('https://vast-shelf-51878.herokuapp.com/product/' + productkey)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productkey])
    console.log(product);
    return (
        <div>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;