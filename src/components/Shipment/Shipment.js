import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userCreate } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Header from '../Header/Header';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(userCreate);
  const onSubmit = data => {
    console.log('form submitted', data)
    const savedCart = getDatabaseCart();
    const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() }
    fetch('https://vast-shelf-51878.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('your order placed successfully')
        }
      })
  };
  return (
    <div>
      <Header userName={loggedInUser.name} success={loggedInUser.success}></Header>
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className="error">Name is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
        {errors.email && <span className="error">Email is required</span>}

        <input name="address" ref={register({ required: true })} placeholder="Your Address" />
        {errors.address && <span className="error">Address is required</span>}

        <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
        {errors.phone && <span className="error">Phone Number is required</span>}
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

export default Shipment;