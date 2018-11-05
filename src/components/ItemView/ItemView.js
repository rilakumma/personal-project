import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './ItemView.css';
import { addItem } from './../../ducks/reducer';
import CloudinaryWidget from '../CloudinaryWidget/CloudinaryWidget';

class ItemView extends Component{
    constructor(){
        super();
        this.state={
            items: [],
            name: '',
            picture: '',
            year: 0,
            description: ''
            
        }
    }

    componentDidMount(){
        this.props.user && axios.get(`/api/items/${this.props.user.id}`).then(res=>{
            // console.log(res.data) 
            this.props.addItem(res.data)
            this.setState({
                items: res.data
            })
        })
    }

    updateItemName(val){
        this.setState({
            name: val
        })
    }
    updateItemPic(val){
        this.setState({
            picture: val
        })
    }
    updateItemYear(val){
        this.setState({
            year: val
        })
    }
    updateItemDesc(val){
        this.setState({
            description: val
        })
    }

    addItem(){
        this.props.user.id &&
        axios.post(`/api/items/${this.props.user.id}`, {
            user_id: this.props.user.id,
            name: this.state.name,
            picture: this.state.picture,
            year: this.state.year,
            description: this.state.description

        } ).then(res=>{
            console.log(res.data)
            this.props.addItem(res.data);
            this.componentDidMount();
        })
        
    }

    

render(){
    const {user_id,name,picture,year,description} = this.state;
    const showItems = this.state.items.map(item=>{
        return <div className='item'>
            <div className='imgbox'><img src={item.picture} className='itemimg' width={200}/></div>
            <h3>{item.name}</h3>
            <p>year: {item.year}</p>
            <p>description: {item.description}</p>
        </div>
    })

    console.log(user_id,name,picture,year,description);
    return(
        <div className='itemview'>
            {/* <div>Item View!</div> */}
            {showItems}

            <div>
                <div>upload an item to your collection :3</div>
                <div className='upload'>
                <input className='inputs' type='text' placeholder='enter item name' onChange={e=> this.updateItemName(e.target.value)}/>
                <CloudinaryWidget />
                {/* <input className='inputs' type='text' placeholder='enter image url' onChange={e=> this.updateItemPic(e.target.value)}/> */}
                <input className='inputs' type='integer' placeholder='enter year made' onChange={e=> this.updateItemYear(e.target.value )}/>
                <input className='inputs' type='text' placeholder='enter item description' onChange={e=> this.updateItemDesc(e.target.value)}/>
                <button className='uploadbtn' onClick={()=> this.addItem()}>upload</button>
                </div>
            </div>
            
            
        </div>
    )
}
}

function mapStateToProps(state){
    return{
        user: state.user,
        items: state.items
    }
}
export default connect(mapStateToProps, {addItem})(ItemView)