import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../../ducks/reducer';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {

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
    
    render(){
    return(
        this.props.pathname !== '/' && (
        <div className='NavBar'>
            <Link to='/' className='logo'><div>☁️☁️☁️☁️☁️</div></Link>
            {this.props.user && 
            <div className='userdisplay'>
            <img className='profilepic' src={this.props.user.picture} />
            
            <div>Hi, { this.props.user.name }!</div>
            <Link to='/dashboard'><button className='logout'>dashboard</button></Link>
            <Link to='/profile'><button className='logout'>profile</button></Link>
            <button className='logout' onClick={()=> this.logout()}>logout</button>
            </div>
            }
        </div>
        )
    )
}
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps, {userLogin})(Nav);