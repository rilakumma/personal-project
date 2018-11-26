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
                this.refs.edittitle.value ='';    
                this.refs.edityear.value ='';    
                this.refs.editdesc.value ='';    
                this.refs.editprice.value ='';    
                    this.setState({
                        editmode: false
                    })
                })
                this.componentDidMount();

            }
    closeEdit = ()=>{
        this.setState({
            editmode: false
        })
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
                <p className='itemyear'>price: $ {item.price}</p>
                
                {/* <div className='bottom'>
                <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}><img src='https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png' width={25} /></button>
                <button className='deletebtn' onClick={()=>this.editToggle(item.id)}><img src='https://dumielauxepices.net/sites/default/files/note-clipart-pencil-icon-698194-8217783.png' width={25}/></button>
                </div> */}
            </div>
    })
        

    const showItems = this.props.pathname === '/collection' ? this.props.items.reverse().map(item=>{
            return <div className='item'>
                <div className='imgbox'><img src={item.photo} className='itemimg' width={200}/></div>
                <h3 className='itemname'>{item.title}</h3>
                <p className='itemyear'>year: {item.year}</p>
                <p className='itemdesc'>description: {item.description}</p>
                <div className='bottom'>
                <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}><img src='https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png' width={25} /></button>
                <button className='deletebtn' onClick={()=>this.editToggle(item.id, item)}><img src='https://dumielauxepices.net/sites/default/files/note-clipart-pencil-icon-698194-8217783.png' width={25}/></button>
                </div>
            </div> 
    }) 
    : this.props.pathname === '/dashboard' &&
    this.props.items.slice((this.props.items.length-4),this.props.items.length).reverse().map(item=>{
        
            return <div className='item'>
                    <div>
                    <div className='imgbox'><img src={item.photo} className='itemimg' width={200}/></div>
                    <h3 className='itemname'>{item.title}</h3> 
                    <p className='itemyear'>year: {item.year}</p>
                    <p className='itemdesc'>description: {item.description}</p>
                    <div>For sale? <input type='checkbox' onClick={()=>this.saleToggle(item.id)} /></div>
                    <div className='bottom'>
                    <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}><img src='https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png' width={25} /></button>
                    <button className='deletebtn' onClick={()=>this.editToggle(item.id, item)}><img src='https://dumielauxepices.net/sites/default/files/note-clipart-pencil-icon-698194-8217783.png' width={25}/></button>
                    </div></div>
            </div>
        
    })
    
    return(
        
        <div className='itemholder'>
            
            {this.props.pathname==='/dashboard' &&     
                <div>
                <h3 className='itemstitle'>my collection</h3>
                <Link to='/collection' className='viewall'>view all</Link>
                </div>
            }

                <div className={this.state.editmode===true ? 'popup' : 'hiddenmode'}>
                    <div className='editmode'>
                    <div className='topbar'>
                    <h3>edit</h3>
                    <span onClick={this.closeEdit} className='close'>&times;</span>
                    </div>
                        <CloudinaryWidget /> 
                        <input className='inputz' placeholder={this.state.editee.title} type='text' onChange={e=> this.updateItemName(e.target.value)} ref='edittitle' />
                        <input className='inputz' placeholder={this.state.editee.year} type='integer' onChange={e=> this.updateItemYear(e.target.value )} ref='edityear' />
                        <input className='inputz' placeholder={this.state.editee.description} type='text' onChange={e=> this.updateItemDesc(e.target.value)} ref='editdesc' />
                        <input className='inputz' placeholder={this.state.editee.price} type='text' onChange={e=> this.updatePrice(e.target.value)} ref='editprice' />
                        <button className='uploadbtn' onClick={()=> this.editItem()}>update</button>
                        </div>
                </div> 

                <div className={this.props.pathname==='/collection'? 'collectview' : 'itemview'}>
                {showItems}
                </div>

                <h3 className='itemstitle'>for sale</h3>
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