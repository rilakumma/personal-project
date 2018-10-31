const INITIAL_STATE = {
    user: null
};

const UPDATE_USER = 'UPDATE_USER';

export default function reducer(state=INITIAL_STATE, action){
    switch(action.type){
        case UPDATE_USER:
        return Object.assign({}, state, {user: action.payload});
        default: return state;
    }
}

export function userLogin(user){
    return{
        type: UPDATE_USER,
        payload: user
    }
}