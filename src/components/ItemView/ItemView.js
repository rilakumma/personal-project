import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './ItemView.css';

class ItemView extends Component{
    constructor(){
        super();
        this.state={
            items: [],
            newItem: ''
        }
    }

    componentDidMount(){

        this.props.user && axios.get(`/api/items/${this.props.user.id}`).then(res=>{
            console.log(res.data)
            this.setState({
                items: res.data
            })
        })
    }

render(){
    const showItems = this.state.items.map(item=>{
        return <div className='item'>
            <img src={item.picture} className='itemimg'/>
            <h3>{item.name}</h3>
            <p>year: {item.year}</p>
            <p>description: {item.description}</p>
        </div>
    })
    return(
        <div className='itemview'>
            {/* <div>Item View!</div> */}
            {showItems}
        </div>
    )
}
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(ItemView)