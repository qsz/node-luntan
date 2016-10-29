import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactDOM,{render} from 'react-dom';
import {connect} from 'react-redux';

import {Footer,Header,TipMsg} from './common/Index';
import { fetchTopic } from '../Action/Index';


class NewTopic extends Component{
    render() {
        return (
            <div className="topic-create">
                <div className="item">
                    <select>
                        <option>请选择发表类型</option>
                        <option>分享</option>
                        <option>问答</option>
                        <option>招聘</option>
                    </select>
                </div>
                <div className="item">
                    <input type="text" placeholder="标题 字数10字以上"/>
                </div>
                <div className="item">
                    <textarea placeholder="内容 字数30字以上"></textarea>
                </div>
            </div>
        );
    }
}

export default class TopicCreate extends Component {
    render() {
        return (
            <div>
                <Header title="发表主题"/>
                {
                    localStorage.username ? <NewTopic></NewTopic>:<TipMsg></TipMsg>
                }
                <Footer index="1"></Footer>
            </div>
        );
    }
}