import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../product/Product';

const ProductDetail = () => {
    const { productkey } = useParams();
    const product = fakeData.find(pd => pd.key == productkey)
    console.log(product);
    return (
        <div>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;