import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactDOM,{render} from 'react-dom';
import {connect} from 'react-redux';

import {Footer,Header,TipMsg} from './common/Index';
import { fetchTopic } from '../Action/Index';


export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: '登入'
        };
    }
    signin(){
        const accesstoken = this.refs.accesstoken.value;
        if (!accesstoken) return alert('不能为空！');
        this.setState({ button: '登入中...' });
        $.ajax({
            url: 'https://cnodejs.org/api/v1/accesstoken',
            data:{accesstoken:accesstoken},
            type:'POST',
            success: res => {
                if(res.success){
                    localStorage.username = res.loginname;
                    localStorage.accesstoken = accesstoken;
                    alert('登入成功');
                    this.setState({ button: '登入' });
                    window.location.hash = '#user/'+res.loginname
                }else {
                    alert('登录失败');
                    this.setState({ button: '登入' });
                }
            },
            error: (err) => {
                alert('登录失败！');
                console.log(err);
                this.setState({ button: '登入' });
            }
        });
    }
    render() {
        return (
            <div>
                <Header title="登入" back="y"/>
                <div className="signin">
                    <div className="cen">
                        <div className="text">
                            <input ref="accesstoken" type="text" placeholder="Access Token" />
                        </div>
                        <button className="btn" onClick={this.signin.bind(this)}>{this.state.button}</button>
                    </div>
                </div>
            </div>
        );
    }
}