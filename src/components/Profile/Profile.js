import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Profile.css';

class Profile extends Component {
    render(){
        const { user } = this.props;
        return(
            <div className='profileBox'>
            <h1>Profile</h1>
        
            {user?
            <div>
            <img src={user.picture} width={200}/>
            <div>name: {user.name}</div>
            <div>email: {user.email}</div>
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
    // console.log(state)
    return{
            user: state.user 
    }
}
export default connect(mapStateToProps)(Profile);