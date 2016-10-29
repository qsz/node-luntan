import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import action from '../../Action/Index';


class FooterInit extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var arr = [];
        arr[this.props.index] = 'on';
        return (
            <footer className="common-footer">
                <ul className="menu">
                    <li className={arr[0]}>
                        <Link to="/">
                            <i className="iconfont icon-shouye">&#xe631;</i>
                            首页
                        </Link>
                    </li>
                    <li className={arr[1]}>
                        <Link to="/topic/create">
                            <i className="iconfont icon-fabu">&#x3434;</i>
                            发表
                        </Link>
                    </li>
                    <li className={arr[2]}>
                        <Link to="/my/messages">
                            <i className="iconfont icon-xiaoxi">&#xe65c;</i>
                            消息
                        </Link>
                    </li>
                    <li className={arr[3]}>
                        <Link to={localStorage.username ? '/user/'+localStorage.username : "/signin"}>
                            <i className="iconfont icon-wode">&#xe61e;</i>
                            我的
                        </Link>
                    </li>
                </ul>
            </footer>
        );
    }
}
FooterInit.defaultProps = {  //初始属性
    index: 0
};

function footer_mapStateToProps(state) {
    const {
        isFetching,
        items
    } = state || {
        isFetching: true,
        items: []
    };

    return {
        isFetching,
        items
    }
}

const Footer = connect(footer_mapStateToProps)(FooterInit);


class HeaderInit extends Component {
    constructor(props) {
        super(props);

    }

    goBack(){
        window.history.back(-1);
    }
    render(){
        const{title,back,out} = this.props;
        return(
            <header className="common-header">
                {
                    back ? <span className="back" onClick={this.goBack}><i className="iconfont">&#xe64c;</i></span>:null
                }
                <h2 className="title" data-flex-box="1">{title}</h2>
                {
                    out ?<a href="#/signout" className="out"><i className="iconfont">&#xe66a;</i></a>:null
                }
            </header>
        )
        
    }
}

function header_mapStateToProps(state) {
    const {
        isFetching,
        items
    } = state || {
        isFetching: true,
        items: []
    };

    return {
        isFetching,
        items
    }
}
const Header = connect(header_mapStateToProps)(HeaderInit);


class TipMsg extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <div className="tip-msg">
                你还未登录，请先<a href="#/signin">登入</a>
            </div>
        )

    }
}





export {Footer,Header,TipMsg}