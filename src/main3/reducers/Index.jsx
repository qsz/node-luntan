import { combineReducers } from 'redux';
import objectAssign from 'object-assign';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../config/ActionTypes';

const postIssues = (state = {
    isFetching: false,
    items: [],
    page:1,
    offsetY:0
}, action) => {
    switch (action.type) {
        case REQUEST_ISSUES:
            // 请求issues
            return objectAssign({}, state,{
                isFetching: true,
                items:[],
                page:1,
                offsetY:0
            });
        case RECEIVE_ISSUES:
            // 接收issues
            return objectAssign({}, state, {
                isFetching: false,
                items: action.posts
            });
        case 'REQUEST_ADD':
            return objectAssign({}, state, {
                isFetching: true,
                page:action.page+1,
            });
        case 'ADD_ISSUES':
            return objectAssign({}, state, {
                isFetching: false,
                items: action.posts
            });
        case 'setY':
            return objectAssign({}, state, {
                offsetY:action.setY
            });
        default:
            return state;
    }
}

const Topic = (state = {
    isFetching: false,
    article:{}
}, action)=>{
    switch (action.type) {
        case 'REQUEST_TOPIC':
            return objectAssign({}, state,{
                isFetching: true
            });
        case 'RECEIVE_TOPIC':
            return objectAssign({}, state,{
                isFetching: false,
                article:action.posts
            });
        default:
            return state;
    }
}

const User = (state={
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_USER':
            return objectAssign({}, state,{
                isFetching: true,
                items:[]
            });
        case 'RECEIVE_USER':
            return objectAssign({}, state,{
                isFetching: false,
                items:action.posts
            });
        default:
            return state;
    }
}


const UserView = (state={
    user_isFetching: false,
    user_items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_USERVIEW':
            return objectAssign({}, state,{
                user_isFetching: true,
                user_items:[]
            });
        case 'RECEIVE_USERVIEW':
            return objectAssign({}, state,{
                user_isFetching: false,
                user_items:action.posts
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    postIssues,
    Topic,
    User,
    UserView
})
export default rootReducer 





