import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
require('dotenv').config();

const CURRENCY = 'USD';
const dollarToCents = amount => amount * 100;

const successPayment = data => {
    alert('Payment successful');
}
const errorPayment = data => {
    alert('Payment error');
}

const onToken = (amount, description) => token => axios.post(process.env.PAYMENT_SERVER_URL, {description, source: token.id, currency: CURRENCY, amount: dollarToCents(amount)})
    .then(successPayment).catch(errorPayment);

const Checkout = ({name, description, amount}) =>
<StripeCheckout name={name} description={description} amount={dollarToCents(amount)} token={onToken(amount,description)} currency={CURRENCY} stripeKey={process.env.STRIPE_PUBLISHABLE} />

export default Checkout;