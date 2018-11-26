import React, {Component} from 'react';
import './Home.css';
import axios from 'axios';
import { userLogin} from './../../ducks/reducer';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(){
        super();
        this.state={
            loading: true,
            error: null,
            recent: [],
            users: []
        }
    }

    componentDidMount(){
       this.getUser();
       this.recentItems();
       this.getUsers();
    }
    componentDidUpdate(prevState){
        if(prevState.recent !== this.state.recent){
            this.recentItems();
        }
    }
    getUser=()=>{
        axios.get('/api/me').then(res=>{
            this.props.userLogin(res.data);
        }).catch(error=>{
            this.setState({error})
        }).then( ()=> {this.setState({ loading: false }) })
    }
    getUsers = () =>{
        axios.get('/api/users').then(res=>{
            console.log('users~~~',res.data)
            this.setState({
                users: res.data
            })
        })
    }
    logout = () =>{
        axios.post('/api/logout').then( res=>{
            console.log('Youve been logged out');
        })
        window.location.reload();
    }
    recentItems = () =>{
        axios.get('/api/items').then(items=>{
            this.setState({
                recent: items.data
            })
        })
    }

    render(){
        // const { loading, error } = this.state;
        const { user } = this.props;
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
        
        const recentlyAdded = this.state.recent.reverse().map(item=>{
            return <div className='recents'>
                <img src={item.photo} width={100}/>
                <h2 className='imgtitle'>{item.title}</h2>
                <p className='username'>{item.username}</p>
                {item.price > 0 && <p className='itemprice'>${item.price}</p>}
            </div>
        })


        // const spotlight = this.state.users.filter(user => user.id === 1)
        // console.log(spotlight)
        // const showSpotlight = spotlight.map(val=>{
        //     return  <div className='spotlight'>
        //     <h3>User Spotlight</h3>
        //     <div>{val.name}</div>
        //     <p>collectables: </p>
        // </div>
        // })
        
        return(
            <div className='home'>

                <div className='head'>
                    <Link to='/' className='linktitle'><h1 className='title'>pompom</h1></Link>
                    {user
                                ?   <div className='loggedin'>
                                    <div>Welcome, <Link to='/dashboard' className='userlink'>{user.username}</Link></div>
                                    <div className='logoutlink' onClick={this.logout}>logout</div></div>
                            
                                : <div><a href={url} className='login'>login</a></div>
                    }
                </div>
                
                <div className='topbanner'>
                    <p className='about'>
                            Welcome to pompom! <br />
                            Share your collection <br />
                            Sell your items <br />
                            Discover rare collectables <br />
                            <a href={url} className='join'>&hearts; Get started</a>
                    </p>
                    
                    <img src='https://nksoldes2015.com/images/manager-clipart-marketing-department-3.png' className='firstpic' />
                    
                </div>
                <div className='middlebanner'>
                    <img src='https://www.sanrio.com/media/W1siZiIsIjIwMTYvMDYvMDgvMjAvNTEvMDgvMTgyL2Fib3V0X3RvcC5wbmciXV0/about_top.png?sha=36217d70b34d6b91' className='second' />
                </div>
            

                <div className='thirdbanner'>
                    <h2 className='recentstitle'>recently uploaded items...</h2>
                    <div className='recentbox'>{recentlyAdded}</div>
                    {/* <span>{recentlyAdded}</span> */}
                </div>


                <footer className='footy'>
                    <img src='../../../favicon.ico' width={50}/>
                    <div>Madi Walmsley</div>
                </footer>
                    {/* <div className='left'>
                    <div className='bubble'>
                    <h1 className='title'>pompom</h1>
                    </div>
                    </div>


                    <div className='middle'>
                    <div className='welcomebub'>
                    {loading? 
                        <div>Loading...</div> 
                        : error 
                            ? <div>There was an error loading</div>
                            : user
                                ?   <div>
                                    <div>Welcome, {user.name}</div>
                                    <div className='logoutlink' onClick={this.logout}>logout</div></div>
                            
                                : <div><a href={url} className='login'>login</a></div>
                    }
                    </div></div>



                    <div className='right'>
                    <div className='about'>
                        Welcome to pompom! <br />
                        Share your collection <br />
                        Sell your items <br />
                        Discover rare collectables <br />
                        Follow collecters just like you
                    </div>



                    <div className='twitterbox'>
                        <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="sanrio"
                        options={{height: 400}}
                        style={{background:"pink"}}
                        />
                    </div>
                    </div> */}
            
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user,
        items: state.items,
        photo: state.photo
    }
}
export default  connect(mapStateToProps, { userLogin })(Home);

