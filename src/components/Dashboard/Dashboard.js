import React, {Component} from 'react';
import ItemView from '../ItemView/ItemView';
import './Dashboard.css';

export default class Dashboard extends Component {


    render(){
        return(
            <div className='dash'>
            {/* <h1>Dashboard</h1> */}
            <ItemView pathname={window.location.pathname} />
            
            

            </div>
        )
    }
}