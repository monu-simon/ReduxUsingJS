const redux = require('redux');

const GET_ICE_CREAM = 'GET_ICE_CREAM'
const GET_CAKE = 'GET_CAKE'

const cakeShopInitialState = {
  noOfCakes: 10
}

const iceCreamShopInitialState = {
  noOfIceCream: 20
}

const getIceCream = () => {
  return {
    type: GET_ICE_CREAM
  }
}

const getCake = () => {
  return {
    type: GET_CAKE
  }
}

const iceCreamReducer = (state=iceCreamShopInitialState,action) => {
    switch(action.type) {
        case GET_ICE_CREAM: {
            return {
                ...state,
                noOfIceCream: state.noOfIceCream - 1
            }
        }
        default: return state
    }
}

const cakeReducer = (state=cakeShopInitialState,action) => {
    switch(action.type) {
        case GET_CAKE: {
            return{
                ...state,
                noOfCakes: state.noOfCakes - 1
            }
        }
        default: return state
    }
}
const combined = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = redux.createStore(combined);
console.log(store.get)
const unsubscribe = store.subscribe(res => {
    console.log(store.getState());
});
store.dispatch(getCake());
store.dispatch(getCake());
store.dispatch(getIceCream())
unsubscribe();