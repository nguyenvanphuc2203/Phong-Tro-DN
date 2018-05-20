import { combineReducers, createStore } from 'redux';

// redux store
var defaultState =  [
    { "nickname" : "PHUC" , "message" : "hello man!"},
    { "nickname" : "PHUC" , "message" : "have a nice day ?!"}
  ];

var chat = (state = defaultState,action) => {
  switch (action.type) {
    case 'SEND':
      return  [...state,action.item];
    case 'CLEAR':
      return [] ;
    default: return state;

  }
}
var access_token = (state = "",action) =>{
  if ( action.type === 'ADD_TOKEN') return action.access_token;
  return state;
}

var user = ( state = { name:"NO_USERNAME", picture : { data : { url:"https://i.imgur.com/xuNCUjB.png"}}} ,action) => {
  if ( action.type === 'LOGIN') return action.info;
  return state;
}

var isLogin = ( state = false ,action) => {
  if ( action.type === 'IS_LOGIN') return state = true;
  return state;
}

var rootReducer = combineReducers({chat,access_token,user,isLogin})

var store = createStore(rootReducer);

console.log(store.getState());
// end redux store
export default store;
