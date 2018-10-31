import React, {Component} from 'react';
import { connect } from 'react-redux';
import { userLogin } from './../../ducks/reducer';
import axios from 'axios';
import './Profile.css';

class Profile extends Component {
    componentDidMount(){
        axios.get('/api/me').then(res=>{
            this.props.userLogin(res.data);
        }).catch(error=>{
            console.log('error', error)
        })
    }

    render(){
        console.log(this.props);
        const { user } = this.props;
        return(
            <div>
            <h1>Profile</h1>
        
            {this.props.user?
            <div>
            <div>name: {user.name}</div>
            <div>email: {user.email}</div>
            <img src={user.picture} width={200}/>
            </div>
            : <div className="noUser" >
            <p>No user found O.o </p>
            <p>Please <a href='/'>login</a></p>
            </div>
            }
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
            user: state.user 
    }
}
export default connect(mapStateToProps, {userLogin})(Profile);