import React from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from '../SimpleCadForm/SimpleCardForm';
import SplitCardForm from '../SplitCardForm/SplitCardForm';

const stripePromise = loadStripe('pk_test_51IeKYcAUQY6BqyqpINJYQdJEUgOIvirYLn3WJNEUTxdUxqqqTJ13gAAp3JIjmQNtPFKZdKV8DN6DxCWDeSCQHOp800V7IKNrSx');

const ProcessPayment = ({handlePayment}) => {
	return (
		<Elements stripe={stripePromise}>
			<h1>Please Pay for me</h1>
			<SimpleCardForm handlePayment = {handlePayment}></SimpleCardForm>
		</Elements>
	);
};

export default ProcessPayment;