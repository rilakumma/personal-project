import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../../ducks/reducer';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {

    componentDidMount(){
        axios.get('/api/me').then(res=>{
            console.log(res.data.user)
            this.props.userLogin(res.data);
            // sessionStorage.setItem('user', res.data)
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
    
    // const userObj = JSON.parse(sessionStorage.getItem('user'));
    // console.log(userObj);
    // console.log(sessionStorage.getItem('user'));
    render(){
    return(
        this.props.pathname !== '/' && (
        <div className='NavBar'>
            <Link to='/' className='logo'><div>☁️☁️☁️☁️☁️</div></Link>
            {this.props.user && 
            <div className='userdisplay'>
            <img className='profilepic' src={this.props.user.picture} />
            {/* {this.props.user.username &&
            <div>{this.props.user.username}</div>
            } */}
            <div>Hi, {this.props.user.name}!</div>
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