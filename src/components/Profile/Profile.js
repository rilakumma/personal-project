import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateUsername } from '../../ducks/reducer';
import axios from 'axios';
import './Profile.css';

class Profile extends Component {
    constructor(){
        super();
        this.state={
        username: ''
    }
}

    updateUsername(val){
        this.setState({
            username: val 
        })
    }
    sendUsername(id){
        axios.patch(`/api/me/${id}`, {username: this.state.username}).then(res=>{
            console.log('res', res.data)
            this.props.updateUsername(this.state.username)
        }).catch(error => {
            console.log('error', error);
        })
    }
    welcomeEmail(){
        this.props.user && axios.post('/api/email', {email: this.props.user.email}).then(res=>{
            console.log(res.data)
        })
    }
    render(){
        const { user } = this.props;
        // console.log(this.state.username)
        console.log(this.props.user);
        return(
            <div className='profileBox'>
            <h1>Profile</h1>
            {user?
            <div className='prof'>
            <img src={user.picture} width={200}/>
            {user.username &&
            <div>username: {user.username}</div>
            }
            <div>name: {user.name}</div>
            <div>email: {user.email}</div>
            <div>update username:<input onChange={e => this.updateUsername(e.target.value)} /><button className='update' onClick={()=> this.sendUsername(user.auth0_id)}>Update</button></div>
            <button className='welcome' onClick={()=>this.welcomeEmail()}>✨Keep in touch!✨</button>
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
export default connect(mapStateToProps, {updateUsername})(Profile);