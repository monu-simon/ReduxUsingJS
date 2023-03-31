const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios')
const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailed = (err) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: err
    }
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: {
            return {
                ...state,
                loading:true
            }
        }
        case FETCH_USERS_SUCCESS: {
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        }
        case FETCH_USERS_FAILED: {
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        }
        default: return state
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
            dispatch(fetchUserSuccess(res.data))
        }).catch(err => {
            dispatch(fetchUsersFailed(err.message))
        })
    }
}

const store = redux.createStore(reducer,redux.applyMiddleware(thunkMiddleware));

store.subscribe(res => {
    console.log(store.getState())
})
store.dispatch(fetchUsers())
