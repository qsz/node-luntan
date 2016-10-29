import { Router, Route, hashHistory,browserHistory,IndexRoute, Link, IndexLink ,IndexRedirect } from 'react-router';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import NProgress from 'nprogress';
import Roots from '../components/Roots';

import IndexList from '../components/IndexList.jsx'  //首页组件
import Topic from '../components/Topic.jsx'   //主题详情
import TopicCreate from '../components/TopicCreate.jsx'
import MyMessages from '../components/MyMessages.jsx'
import Signin from '../components/Signin.jsx'
import Signout from '../components/Signout.jsx'
import UserView from '../components/UserView.jsx'



const RouteConfig = (
    <Router history={hashHistory}>
        <Route path="/" component={Roots}>
            <IndexRoute component={IndexList} />
            <Route path="topic/create" component={TopicCreate} />
            <Route path="topic/:id" component={Topic} />
            <Route path="my/messages" component={MyMessages} />
            <Route path="user/:loginname" component={UserView} />
            <Route path="signin" component={Signin} />
            <Route path="signout" component={Signout} />
        </Route>
    </Router>
);




export default RouteConfig;
