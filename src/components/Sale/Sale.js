import React, {Component} from 'react';
import Checkout from './../Checkout/Checkout';

export default class Sale extends Component {
    constructor(){
        super();
        this.state={
            sale: []
        }
    }
    render(){
        return(
            <div>
                <Checkout
                name={'Test'}
                description={'pompom test'}
                amount={10000000000}
                 />
            </div>
        )
    }
}