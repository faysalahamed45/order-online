import React, { useContext } from 'react';
import { userCreate } from '../../App';
import fakeData from '../../fakeData';
import Header from '../Header/Header';

const Inventory = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userCreate);
    const handleAddProduct = () => {
        fetch('https://vast-shelf-51878.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)


        })
    }
    return (
        <div>
            <Header userName={loggedInUser.name} success={loggedInUser.success}></Header>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;