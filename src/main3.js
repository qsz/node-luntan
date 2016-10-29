import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import route from './main3/config/Route'; //路由配置
import store from './main3/config/Store';

import '../css/reset.css'; //重置浏览器默认样式
import '../css/base.css';




ReactDOM.render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.getElementById('app')
)
