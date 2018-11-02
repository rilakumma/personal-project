const INITIAL_STATE = {
    user: null
};

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USERNANE = 'UPDATE_UESRNAME';

export default function reducer(state=INITIAL_STATE, action){
    switch(action.type){
        case UPDATE_USER:
        return Object.assign({}, state, {user: action.payload});
        // case UPDATE_USERNANE:
        // return Object.assign({}, state, {username: action.payload});
        default: return state;
    }
}

export function userLogin(user){
    return{
        type: UPDATE_USER,
        payload: user
    }
}

// export function updateUsername(username){
//     return{
//         type: UPDATE_USERNANE,
//         payload: username
//     }
// }