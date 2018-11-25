import React, {Component} from 'react';
import './Home.css';
import axios from 'axios';
import { userLogin} from './../../ducks/reducer';
import { connect } from 'react-redux';
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(){
        super();
        this.state={
            loading: true,
            error: null,
            recent: []
        }
    }

    componentDidMount(){
       this.getUser();
       this.recentItems();
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
    logout = () =>{
        axios.post('/api/logout').then( res=>{
            console.log('Youve been logged out');
        })
        window.location.reload();
    }
    recentItems = () =>{
        axios.get('/api/items').then(items=>{
            console.log(items.data)
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

        return(
            <div className='home'>

                <div className='head'>
                    <Link to='/' className='linktitle'><h1 className='title'>pompom</h1></Link>
                    {user
                                ?   <div className='loggedin'>
                                    <div>Welcome, {user.username}</div>
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
                            <a href={url} className='join'>Join now</a>
                    </p>
                    
                    <img src='https://nksoldes2015.com/images/manager-clipart-marketing-department-3.png' className='firstpic' />
                    
                </div>
                <div className='middlebanner'>
                    <img src='https://vignette.wikia.nocookie.net/hellokitty/images/2/21/Sanrio_Characters_Corocorokuririn--Chibikuri--Cherri--Chacha_Image001.png/revision/latest?cb=20170408005620' className='second' />
                    
                    <div className='tweetbox'><TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="sanrio"
                        options={{height: 400}}
                        /></div>
                </div>
            

                <div className='thirdbanner'>
                    <h2 className='recentstitle'>recently uploaded items</h2>
                    <div className='recentbox'>{recentlyAdded}</div>
                </div>


                <footer className='footy'>
                    <img src='../../../favicon.ico' width={50}/>
                    <div>Madi Walmsley</div>
                    {/* <img src="https://sanrio-production-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTcvMTAvMjAvMTkvMjIvMDgvODI2L3NhbnJpb19kb3RfY29tX3NraW5fZGVza3RvcF9ob21lX2hvbGlkYXlfZm9vdGVyLnBuZyJdXQ/sanrio-dot-com-skin-desktop-home-holiday-footer.png?sha=403c7ae5267bf412" className='footy' /> */}
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

