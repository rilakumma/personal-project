import React from 'react';
import { connect } from 'react-redux';
import ItemView from '../ItemView/ItemView';
import './Collection.css';

function Collection(){
    return(
        <div className='collection'>
            <h1>my collection</h1>
            <ItemView pathname={window.location.pathname} />
        </div>
    )
}
function mapStateToProps(state){
    return{
        user: state.user,
        items: state.items,
        photo: state.photo
    }
}
export default connect(mapStateToProps)(Collection);
