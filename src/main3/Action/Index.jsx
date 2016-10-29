// import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../config/ActionTypes';


// 请求issues
function requestIssues() {
    return {
        type: REQUEST_ISSUES
    };

}

// 接收issues
function receiveIssues(json) {
    return {
        type: RECEIVE_ISSUES,
        posts: json
    };
}

// thunk action creater
export function fetchIssues(items,tab,page) {   //fetchIssues(created, 1000)
    return (dispatch,getState)  => {
        dispatch(requestIssues());   //{isFetching: false,items: []}
        console.log('新闻列表是否清空',getState().postIssues.items)
        const mytab = tab || '';
        const mypage = page || 1;
        let url = 'https://cnodejs.org/api/v1/topics?limit=10'+'&tab='+mytab+'&page='+mypage;

        return $.ajax({
            url: url,
            data:'',
            type:'GET',
            success: json => {
                dispatch(receiveIssues(json));      //{isFetching: false,items: json}
            },
            error: () => {
                alert('加载失败')
            }
        });
    };
}

function requestadd(page) {
    return {
        type: 'REQUEST_ADD',
        page
    };
}


export  function addIssues(items,tab,page) {   //fetchIssues(created, 1000)
    return (dispatch,getState) => {
        dispatch(requestadd(getState().postIssues.page));   //{isFetching: false,items: []}
        const mytab = tab || '';
        const mypage = getState().postIssues.page;
        let url = 'https://cnodejs.org/api/v1/topics?limit=10'+'&tab='+mytab+'&page='+mypage;

        return $.ajax({
            url: url,
            data:'',
            type:'GET',
            success: json => {
                json.data.map((item, index) =>{
                    items.data.push(item)
                });
                dispatch({
                    type:'ADD_ISSUES',
                    posts:items
                });
            },
            error: () => {
                alert('加载失败')
            }
        });
    };
}



function shouldFetchIssues(state) {
    if (state.postIssues.items.length<1) {
        return true;
    }
    if (state.isFetching) {
        return false
    }
    return !state.postIssues.items.length;
}


// 按需获取issues
export function fetchIssuesIfNeeded(items,tab,page ) {
    // 当已经有issues的时候，则减少网络请求
    return function(dispatch, getState) {
        if ( shouldFetchIssues(getState()) ) {
            if(!items) {
                return dispatch(fetchIssues(items, tab, page));
            }else{
                console.log('start loading...');
                return dispatch(addIssues(items, tab, page));
            }
        } else {
            // 告诉调用代码不需要再等待。
            return Promise.resolve();
        }
    };
}


export function fetchTopic(id){
    return (dispatch,getState)  => {
        dispatch({type: 'REQUEST_TOPIC'});
        let url = 'https://cnodejs.org/api/v1/topic/'+id;
        return $.ajax({
            url: url,
            data:'',
            type:'GET',
            success: json => {
                console.log('json',json);
                dispatch({
                    type: 'RECEIVE_TOPIC',
                    posts: json
                });
            },
            error: (err) => {
                alert('加载失败')
            }
        });
    };
}


export function fetchUser(loginname){
    return (dispatch,getState)  => {
        dispatch({type: 'REQUEST_USER'});
        let url = 'https://cnodejs.org/api/v1/user/'+loginname ;
        return $.ajax({
            url: url,
            data:'',
            type:'GET',
            success: json => {
                dispatch({
                    type:'RECEIVE_USER',
                    posts: json
                });
            },
            error: (err) => {
                alert('加载失败')
            }
        });
    };
}