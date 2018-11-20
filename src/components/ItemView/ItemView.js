import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './ItemView.css';
import { addItem } from './../../ducks/reducer';
import {Link} from 'react-router-dom';

class ItemView extends Component{
    constructor(props){
        super();
        this.state={
            items: [],
            click: false,
            editmode: false,
            editId: 0
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
    

    // updateItemName(val){
    //     this.setState({
    //         name: val
    //     })
    // }
    // updateItemYear(val){
    //     this.setState({
    //         year: val
    //     })
    // }
    // updateItemDesc(val){
    //     this.setState({
    //         description: val
    //     })
    // }
    // updatePrice(val){
    //     this.setState({
    //         price: val
    //     })
    // }

    // addItem(){
    //     this.props.user.id &&
    //     axios.post(`/api/items/${this.props.user.id}`, {
    //         user_id: this.props.user.id,
    //         name: this.state.name,
    //         picture: this.props.picture,
    //         year: this.state.year,
    //         description: this.state.description

    //     } ).then(res=>{
    //         console.log(res.data)
    //         this.props.addItem(res.data);
    //         this.componentDidMount();
    //     })
        
    // }

    deleteItem(id){
        axios.delete(`/api/items/${this.props.user.id}/${id}`).then(res=>{
            this.componentDidMount();
        })
    }

    editToggle(id){
        this.setState({
            editmode: true,
            editId: id
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

    // editItem(id){
    //     axios.patch(`/api/items/${this.props.user.id}/${id}`, {user_id: this.props.user.id,
//             name: this.state.name,
//             picture: this.props.picture,
//             year: this.state.year,
//             description: this.state.description
// }).then(res=>{
    // this.props.addItem(res.data);
    // this.componentDidMount();
            // this.setState({
                // editmode: false
            // })
    //     })
    // }


render(){
    console.log('items', this.props.items)
    let sale = this.props.items.filter(item=> item.forsale === true)
    console.log(sale)
    const saleItems = sale.map(item=>{
        return <div className='item'>
            <div className='imgbox'><img src={item.picture} className='itemimg' width={200}/></div>
            <h3 className='itemname'>{item.name}</h3> 
            <p className='itemyear'>year: {item.year}</p>
            <p className='itemdesc'>description: {item.description}</p>
            <p className='itemdesc'>forsale: {item.forsale}</p>
            <p className='itemdesc'>price: $ {item.price}</p>
            
            <div className='bottom'>
            <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}>delete</button>
            <button className='deletebtn' onClick={()=>this.editToggle(item.id)}>edit</button>
            </div>
        </div>
    })
        const {editmode, editId, items} = this.state;

    const showItems = this.props.pathname === '/collection' ? this.props.items.map(item=>{
         return <div className='item'>
            <div className='imgbox'><img src={item.picture} className='itemimg' width={200}/></div>
            {editmode===true ? <input className='inputs' type='text'  onChange={e=> this.updateItemName(e.target.value)}/> : <h3 className='itemname'>{item.name}</h3>}
            <p className='itemyear'>year: {item.year}</p>
            <p className='itemdesc'>description: {item.description}</p>
            <div className='bottom'>
            <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}>delete</button>
            <button className='deletebtn' onClick={()=>this.editToggle(item.id)}>edit</button> 
            </div>
        </div> 
    }) 
    : this.props.pathname === '/dashboard' &&
    this.props.items.slice((this.props.items.length-4),this.props.items.length).reverse().map(item=>{
        return <div className='item'>
            <div className='imgbox'><img src={item.picture} className='itemimg' width={200}/></div>
            <h3 className='itemname'>{item.name}</h3> 
            <p className='itemyear'>year: {item.year}</p>
            <p className='itemdesc'>description: {item.description}</p>
            <div>For sale? <input type='checkbox' onClick={()=>this.saleToggle(item.id)} /></div>
            <div className='bottom'>
            <button className='deletebtn' onClick={()=> this.deleteItem(item.id)}>delete</button>
            <button className='deletebtn' onClick={()=>this.editToggle(item.id)}>edit</button>
            </div>
        </div>
    })
    
   
        console.log(this.props.items)
        console.log(this.props.items[0])
        console.log(this.state.editId)
        console.log(this.props.items[this.state.editId])

    return(
        <div>
            <div>
            <h3>my collection</h3>
            <p><Link to='/collection' className='viewall'>view all</Link></p>
            </div>


            {/* display items section */}
            <div className={this.props.pathname==='/collection'? 'collectview' : 'itemview'}>
            {/* {this.props.pathname === '/dashboard' && <Link to='/collection' className='viewall'>view all</Link> } */}
            {/* {editmode===false ? showItems : showEditMode} */}
            {showItems}
            </div>

            <h3>for sale</h3>
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
        picture: state.picture
    }
}
export default connect(mapStateToProps, {addItem})(ItemView)