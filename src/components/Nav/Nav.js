import React, {Component} from 'react';
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
            <div>SiteName</div>
            {this.props.user && 
            <div>
            <img className='profilepic' src={this.props.user.picture} />
            <div>{this.props.user.name}</div>
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