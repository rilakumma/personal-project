import React, {Component} from 'react';
import './Home.css';
import axios from 'axios';
import { userLogin} from './../../ducks/reducer';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(){
        super();
        this.state={
            loading: true,
            error: null
        }
    }
    componentDidMount(){
        axios.get('/api/me').then(res=>{
            this.props.userLogin(res.data);
        }).catch(error=>{
            this.setState({error})
        }).then( ()=> {this.setState({ loading: false }) })
    }

    logout = () =>{
        axios.post('/api/logout').then( res=>{
            console.log('Youve been logged out');
        })
        window.location.reload();
    }

    render(){
        const { loading, error } = this.state;
        const { user } = this.props;
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
        console.log(this.props.user);
        return(
            <div>
            <h1>home</h1>
            {user &&
            <div><button onClick={this.logout}>logout</button></div>
            }
            {loading? 
                <div>Loading...</div> 
                : error 
                    ? <div>There was an error loading</div>
                    : user
                        ?<div>
                            <div>Welcome, {user.name}</div>
                            {/* <div>Name: {user.name}</div>
                            <div>Email: {user.email}</div>
                            <img src ={user.picture} alt='user' /> */}
                        </div>
                        : <div><a href={url}>login</a></div>
            }
            </div>

        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default  connect(mapStateToProps, { userLogin })(Home);