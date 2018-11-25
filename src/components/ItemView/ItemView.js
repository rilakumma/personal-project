import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './ItemView.css';
import { addItem } from './../../ducks/reducer';
import {Link} from 'react-router-dom';
import CloudinaryWidget from './../CloudinaryWidget/CloudinaryWidget';

class ItemView extends Component{
    constructor(props){
        super();
        this.state={
            items: [],
            click: false,
            editmode: false,
            editId: 0,
            editee: {}
        }
        this.dropDown = this.dropDown.bind(this);
        this.fetchItems = this.fetchItems.bind(this);
    }

    dropDown(){
        this.setState((prevState)=>{return {click: !prevState.click}})
    }

    componentDidMount(){
            this.props.user && this.fetchItems();
    }

    fetchItems(){
        axios.get(`/api/items/${this.props.user.id}`).then(res=>{
            console.log('items',res.data)
            this.props.addItem(res.data)
            this.setState({
                items: res.data
            })
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            this.fetchItems();
        }
    }
    

   // delete and edit items

    deleteItem(id){
        axios.delete(`/api/items/${this.props.user.id}/${id}`).then(res=>{
            this.componentDidMount();
        })
    }

    saleToggle(id, prevProps){
        this.setState({
            forsale: !prevProps
        })
        axios.patch(`/api/items/${id}`, {forsale: this.state.forsale}).then(res=>{
            console.log(res.data);
            this.componentDidMount();
        })
    }
    
    editToggle(id, val){
        console.log('val',val)
        this.setState({
            editmode: true,
            editId: id,
            editee: val
        })
    }

            updateItemName(val){
                console.log('name', val)
                console.log('editee', this.state.editee)
                this.setState({
                    editee:  {...this.state.editee, title: val}
                })
            }
            updateItemYear(val){
                this.setState({
                    editee: {...this.state.editee, year: val}
                })
            }
            updateItemDesc(val){
                this.setState({
                    editee: {...this.state.editee, description: val}
                })
            }
            updatePrice(val){
                this.setState({
                    editee: {...this.state.editee, price: val}
                })
            }


    editItem(){
        axios.patch(`/api/items/${this.props.user.id}/${this.state.editId}`, this.state.editee).then(res=>{
            
                    this.setState({
                        editmode: false
                    })
                })
                this.componentDidMount();
            }


render(){
    console.log('items', this.props.items)
    let sale = this.props.items.filter(item=> item.forsale === true)
    console.log(sale)
    const saleItems = sale.map(item=>{
        return <div className='item'>
            <div className='imgbox'><img src={item.photo} className='itemimg' width={200}/></div>
            <h3 className='itemname'>{item.title}</h3> 
            <p className='itemyear'>year: {item.year}</p>
            <p className='itemdesc'>description: {item.description}</p>
            <p className='itemdesc'>price: $ {item.price}</p>
            
            <div className='bottom'>
            <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}>delete</button>
            <button className='deletebtn' onClick={()=>this.editToggle(item.id)}>edit</button>
            </div>
        </div>
    })
        

    const showItems = this.props.pathname === '/collection' ? this.props.items.reverse().map(item=>{
         return <div className='item'>
            <div className='imgbox'><img src={item.photo} className='itemimg' width={200}/></div>
            {this.state.editmode ? <input className='inputs' type='text' onChange={e=> this.updateItemName(e.target.value)}/> : <h3 className='itemname'>{item.title}</h3> }
    {this.state.editmode? <input className='inputs' type='integer' onChange={e=> this.updateItemYear(e.target.value )}/> : <p className='itemyear'>year: {item.year}</p> }
    {this.state.editmode ? <input className='inputs' type='text' onChange={e=> this.updateItemDesc(e.target.value)}/> : <p className='itemdesc'>description: {item.description}</p> }
            {this.state.editmode? <input className='inputs' type='text' onChange={e=> this.updatePrice(e.target.value)}/> : <p className='itemdesc'>price: $ {item.price}</p> }
            <div className='bottom'>
            <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}>delete</button>
    {this.state.editmode ? <button className='uploadbtn' onClick={()=> this.editItem()}>update</button> : <button className='deletebtn' onClick={()=>this.editToggle(item.id, item)}>edit</button> }
            </div>
        </div> 
    }) 
    : this.props.pathname === '/dashboard' &&
    this.props.items.slice((this.props.items.length-4),this.props.items.length).reverse().map(item=>{
        
            return <div className='item'>
            {this.state.editmode ? 
                <div className='editmode'>
                <CloudinaryWidget /> 
                <input className='inputs' type='text' onChange={e=> this.updateItemName(e.target.value)}/>
                <input className='inputs' type='integer' onChange={e=> this.updateItemYear(e.target.value )}/>
                <input className='inputs' type='text' onChange={e=> this.updateItemDesc(e.target.value)}/>
                <input className='inputs' type='text' onChange={e=> this.updatePrice(e.target.value)}/>
                <button className='uploadbtn' onClick={()=> this.editItem()}>update</button>
                </div> 
            :
                <div>
                <div className='imgbox'><img src={item.photo} className='itemimg' width={200}/></div>
                <h3 className='itemname'>{item.title}</h3> 
                <p className='itemyear'>year: {item.year}</p>
                <p className='itemdesc'>description: {item.description}</p>
                <div>For sale? <input type='checkbox' onClick={()=>this.saleToggle(item.id)} /></div>
                <div className='bottom'>
                <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}>delete</button>
                <button className='deletebtn' onClick={()=>this.editToggle(item.id, item)}>edit</button>
                </div></div>
            }
        </div>
        
    })
    
        
    
    return(
        
        <div>
            
            {this.props.pathname==='/dashboard' &&     
            <div>
            <h3>my collection</h3>
            <p><Link to='/collection' className='viewall'>view all</Link></p>
            </div>
            }

            {/* display items section */}
            <div className={this.props.pathname==='/collection'? 'collectview' : 'itemview'}>
            {/* {this.props.pathname === '/dashboard' && <Link to='/collection' className='viewall'>view all</Link> } */}
            {/* {editmode===false ? showItems : showEditMode} */}
            
            {showItems}
            </div>

            <h3>for sale</h3>
            <p className='viewall'>view all</p>
            <div className='itemview'>
                {saleItems}
            </div>

            <div>
            <h3>wishlist</h3>
            </div>
        </div>
    )
}
}

function mapStateToProps(state){
    console.log(state)
    return{
        user: state.user,
        items: state.items,
        photo: state.photo
    }
}
export default connect(mapStateToProps, {addItem})(ItemView)