import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './ItemView.css';
import { addItem } from './../../ducks/reducer';
import CloudinaryWidget from '../CloudinaryWidget/CloudinaryWidget';
import {Link} from 'react-router-dom';

class ItemView extends Component{
    constructor(props){
        super();
        this.state={
            items: [],
            name: '',
            picture: '',
            year: 0,
            description: '',
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
    

    updateItemName(val){
        this.setState({
            name: val
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
            picture: this.props.picture,
            year: this.state.year,
            description: this.state.description

        } ).then(res=>{
            console.log(res.data)
            this.props.addItem(res.data);
            this.componentDidMount();
        })
        
    }

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
            <div className={this.props.pathname==='/collection'? 'collectview' : 'itemview'}>
            {/* {this.props.pathname === '/dashboard' && <Link to='/collection' className='viewall'>view all</Link> } */}

            {/* {editmode===false ? showItems : showEditMode} */}
            {showItems}
            </div>

                <div className='addItem'>
                    <div className='words'>
                        <div>upload an item to your collection :3
                        <button onClick={this.dropDown}><img src="https://banner2.kisspng.com/20180203/die/kisspng-arrow-symbol-icon-down-arrow-png-pic-5a756e256c6bb0.6222022915176453494441.jpg" width={20} /></button>
                        </div>
                    </div>
                    <div className={this.state.click ? 'upload' : 'dont'}>
                            <input className='inputs' type='text' placeholder='enter item name' onChange={e=> this.updateItemName(e.target.value)}/>
                            <CloudinaryWidget /> 
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
    console.log(state)
    return{
        user: state.user,
        items: state.items,
        picture: state.picture
    }
}
export default connect(mapStateToProps, {addItem})(ItemView)