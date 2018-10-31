import React from 'react';
import { connect } from 'react-redux';
// import { userLogin } from '../../ducks/reducer';
// import axios from 'axios';

const Nav = props => {
    // const getUserInfo = () => {
    //     axios.get('/api/me').then(res=>{
    //         this.props.userLogin(res.data);
    //     }).catch(error=>{
    //         console.log('error', error)
    //     })
    // };

    // const { user } = this.props;
    return(
        props.pathname !== '/' && (
        <div>
            <div>Nav</div>
            {/* <div>{user.name}</div> */}

        </div>
        )
    )
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(Nav);