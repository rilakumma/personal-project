import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../../ducks/reducer';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {
    constructor(){
        super();
        this.state={
            toggleNav:false
        }
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
                
                <div>Hi, { this.props.user.name }!</div>
                <div className='navLinks'>
                <Link to='/dashboard' className='linky'>dashboard</Link>
                <Link to='/profile' className='linky'>profile</Link>
                <div className='linky' onClick={()=> this.logout()}>logout</div>
                </div>
            </div>
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