import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactDOM,{render} from 'react-dom';
import {connect} from 'react-redux';

import {Footer,Header,TipMsg} from './common/Index';
import { fetchTopic } from '../Action/Index';


export default class Signout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: '登录'
        };
    }
    signout(){
        localStorage.removeItem('username');
        localStorage.removeItem('accesstoken');
        alert('退出成功');
        window.location.hash ="#/";
    }
    render() {
        return (
            <div>
                <Header title="退出登入" back="y"/>
                <div className="signin">
                    <div className="cen">
                        <button className="btn btn-red" onClick={this.signout.bind(this)}>确认退出登录?</button>
                    </div>
                </div>
            </div>
        );
    }
}