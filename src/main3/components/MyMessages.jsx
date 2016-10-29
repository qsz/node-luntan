import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactDOM,{render} from 'react-dom';
import {connect} from 'react-redux';

import {Footer,Header,TipMsg} from './common/Index';
import { fetchTopic } from '../Action/Index';


export default class MyMessages extends Component {
    render() {
        return (
            <div>
                <Header title="消息"/>
                {
                    localStorage.username ? <div className="tip-msg">暂无消息</div>:<TipMsg></TipMsg>
                }
                <Footer index="2"></Footer>
            </div>
        );
    }
}