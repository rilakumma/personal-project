import React, {Component} from 'react';
import ItemView from '../ItemView/ItemView';

export default class Dashboard extends Component {


    render(){
        return(
            <div>
            <h1>Dashboard</h1>
            <div>my collection</div>
            <ItemView />
            <div>for sale</div>
            <div>wishlist</div>
            

            </div>
        )
    }
}