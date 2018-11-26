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
    componentDidUpdate(prevState){
        if(prevState.username !== this.props.user.username){
           this.props.updateUsername();
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
            this.refs.inputbox.value ='';
            alert(`Username has been changed to ${this.state.username}`)
        }).catch(error => {
            console.log('error', error);
        })
    }
    welcomeEmail(){
        this.props.user && axios.post('/api/email', {email: this.props.user.email}).then(res=>{
            console.log(res.data)
            alert('Thanks for subscribing. Check your email!');
        })
    }
    render(){
        const { user } = this.props;
        // console.log(this.state.username)
        console.log(this.props.user);
        return(
            <div className='profileBox'>
            {/* <h1>Profile</h1> */}
            {user?
            <div className='prof'>
            <div className='anotherdiv'>
            <img src={user.picture} className='profpic'/>
            {user.username &&
            <div className='usernameinfo'>{user.username}</div>
            }</div>
            <div className='information'>
            <div className='userinfo'>name: {user.name}</div>
            <div className='userinfo'>email: {user.email}</div>
            <div className='userinfo'>update username:<input onChange={e => this.updateUsername(e.target.value)} className='usernameinput' ref='inputbox'/><button className='updatename' onClick={()=> this.sendUsername(user.auth0_id)}><img src='http://icons.iconarchive.com/icons/icons8/ios7/256/Very-Basic-Update-icon.png' height={30}/></button></div>
            <button className='welcome' onClick={()=>this.welcomeEmail()}>Keep in touch</button>
            </div>
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