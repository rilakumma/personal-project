import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin, addItem } from '../../ducks/reducer';
import axios from 'axios';
import './Nav.css';
import CloudinaryWidget from '../CloudinaryWidget/CloudinaryWidget';
import Search from '../Search/Search';

class Nav extends Component {
    constructor(){
        super();
        this.state={
            toggleNav:false,
            title: '',
            photo: '',
            year: 0,
            description: '',
            forsale: false,
            price: 0,
            popup: false
        }
        this.togglePopup = this.togglePopup.bind(this);
    }

    componentDidMount(){
        axios.get('/api/me').then(res=>{
            console.log(res.data)
            this.props.userLogin(res.data);
        }).catch(error=>{
            console.log('error', error)
        })
    }

    logout = () =>{
        axios.post('/api/logout').then( res=>{
            console.log('Youve been logged out');
        })
        window.location.replace('/');
    }
    toggle = ()=>{
        this.setState((prevState)=>{
            return{
                toggleNav: !prevState.toggleNav
                }
        })
    }

    updateItemName(val){
        this.setState({
            title: val
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
    updatePrice(val){
        this.setState({
            price: val
        })
    }

    addItem(){
        this.props.user.id &&
        axios.post(`/api/items/${this.props.user.id}`, {
            user_id: this.props.user.id,
            title: this.state.title,
            photo: this.props.photo,
            year: this.state.year,
            description: this.state.description

        } ).then(res=>{
            console.log(res.data)
            this.props.addItem(res.data);
            this.componentDidMount();
            this.setState({
                popup: false
            })
            this.refs.titlebox.value ='';
            this.refs.yearbox.value ='';
            this.refs.descbox.value ='';
        })
        
    }

    togglePopup(prevState){
        this.setState({
            popup: !this.state.popup
        })
    }

    render(){
    return(
        this.props.pathname !== '/' && (
        <div className='NavBar'>
            <div className='header'>
            <Link to='/' className='logo'><div>pompom</div></Link>
            <img src='./../../../favicon.ico' className='dropBtn' width={30} onClick={this.toggle}/>
            </div>

            {this.props.user && 
            <div className={this.state.toggleNav? 'toggler show' : 'toggler hide'}>
            <div className='userdisplay'>
                <img className='profilepic' src={this.props.user.picture} />
                
                <div>Hi, { this.props.user.username }!</div>
                <div className='navLinks'>
                <Link to='/dashboard' className='linky'>dashboard</Link>
                <Link to='/profile' className='linky'>profile</Link>
                <div className='linky' onClick={()=> this.logout()}>logout</div>
                </div>
                    <div className='addItem'>
                            <div>
                                <div className='add' onClick={this.togglePopup}><span className='plus'>&#43;</span></div>
                            </div>
                            <div className={this.state.popup ? 'popup' : 'closepop'}>
                            {/* <div className={this.state.click ? 'upload' : 'dont'}> */}
                                <div className='popup-content'>
                                <span onClick={this.togglePopup} className={this.state.popup ?'close' : 'closepop'}>&times;</span>
                                    <div className='inputform'>
                                    <input className='inputz' type='text' placeholder='enter item name' onChange={e=> this.updateItemName(e.target.value)} ref='titlebox' />
                                    <CloudinaryWidget /> 
                                    <input className='inputz' type='integer' placeholder='enter year made' onChange={e=> this.updateItemYear(e.target.value )} ref='yearbox' />
                                    <input className='inputz' type='text' placeholder='enter item description' onChange={e=> this.updateItemDesc(e.target.value)} ref='descbox' />
                                    <button className='uploadbtn' onClick={()=> this.addItem()}>upload</button>
                                    </div>
                                    </div>
                            </div>
                    </div>
            </div>
            
            </div>
            }

            <div>
                <Search />
            </div>
        </div>
        
        )
    )
}
}

function mapStateToProps(state){
    return{
        user: state.user,
        items: state.items,
        photo: state.photo
    }
}
export default connect(mapStateToProps, {userLogin, addItem})(Nav);