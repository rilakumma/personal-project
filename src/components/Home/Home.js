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
            <div className='home'>
            <h1>home</h1>
            {user &&
            <div><button className='logout' onClick={this.logout}>logout</button></div>
            }
            {loading? 
                <div>Loading...</div> 
                : error 
                    ? <div>There was an error loading</div>
                    : user
                        ?<div>
                            <div>Welcome, {user.name}</div>
                        </div>
                        : <div><a href={url}>login</a></div>
            }
            {/* <div className='twitter'>
            <a class="twitter-timeline" data-width="400" data-height="500" data-theme="light" data-link-color="#ABAAAA" href="https://twitter.com/sanrio?ref_src=twsrc%5Etfw">Tweets by sanrio</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div> */}
            
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

