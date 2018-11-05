const INITIAL_STATE = {
    user: null,
    items: []
};

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USERNANE = 'UPDATE_UESRNAME';
const ADD_ITEMS = "ADD_ITEMS";

export default function reducer(state=INITIAL_STATE, action){
    switch(action.type){
        case UPDATE_USER:
        return Object.assign({}, state, {user: action.payload});
        case UPDATE_USERNANE:
        return {...state, username: action.payload};
        case ADD_ITEMS:
        return {...state, items: [...action.payload]};
        default: return state;
    }
}

export function userLogin(user){
    return{
        type: UPDATE_USER,
        payload: user
    }
}

export function updateUsername(username){
    return{
        type: UPDATE_USERNANE,
        payload: username
    }
}

export function addItem(item){
    return{
        type: ADD_ITEMS,
        payload: item
    }
}