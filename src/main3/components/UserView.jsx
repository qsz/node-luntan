import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactDOM,{render} from 'react-dom';
import {connect} from 'react-redux';
import {Footer,Header,TipMsg} from './common/Index';
import { fetchUser } from '../Action/Index';
import Loading from './common/Loading';
import Tool from '../tools/Tools.jsx'


class Homeli extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last_reply_at:'',
            title:this.props.title,
            id:this.props.id

        };
    }
    componentDidMount() {  //此处要优化
        //时间处理
        const lastBegin = this.props.last_reply_at;
        const lastDiff = Tool.GetDateDiff(lastBegin);
        this.setState({
            last_reply_at:lastDiff
        })
    }
    componentWillReceiveProps(nextProps) {
        const lastBegin = nextProps.last_reply_at;
        const lastDiff = this.GetDateDiff(lastBegin);
        this.state = {
            last_reply_at:lastDiff,
            title:nextProps.title,
            id:nextProps.id
        };
    }
    render() {
        return (
            <li>
                <a href={'#topic/'+this.state.id} className="clear">
                    <div className="tit">{this.state.title}</div>
                    <span>{this.state.last_reply_at}</span>
                </a>
            </li>
        );
    }
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create_at: '',
            isTopic:true,
            avatar_url:'',
            loginname:'',
            score:'',
            recent_replies:[],
            recent_topics:[]
        };

    }
    componentWillMount(){ //此处要优化，为什么会这样。。。
        if(this.props.da){
            this.setState({
                avatar_url:this.props.da.avatar_url,
                loginname:this.props.da.loginname,
                score:this.props.da.score,
                recent_replies:this.props.da.recent_replies,
                recent_topics:this.props.da.recent_topics
            })
        }else{
            return false
        }

    }
    changeTab(e){
        const _this = this;
        if($(e.target).data('index') == 2 && _this.state.isTopic){
            _this.setState({
                isTopic: false
            })
        }
        if($(e.target).data('index') == 1 && !_this.state.isTopic){
            _this.setState({
                isTopic: true
            })
        }
    }
    render() {
        return (
            <div className="user-pannel">
                <div className="user-info">
                    <div className="user-headimg" style={{backgroundImage: 'url(' + this.state.avatar_url + ')'}}></div>
                    <div className="loginname">
                        <span>昵称:{this.state.loginname}&nbsp;&nbsp;&nbsp;积分:{this.state.score}</span>
                    </div>
                </div>
                <ul className="tab-nav">
                    <li className={this.state.isTopic? 'on': 'off'} data-index="1" onClick={this.changeTab.bind(this)}>主题</li>
                    <li className={!this.state.isTopic? 'on': 'off'} data-index="2" onClick={this.changeTab.bind(this)}>回复</li>
                </ul>
                <ul className="user-list">
                    {
                        this.state.isTopic ?
                            this.state.recent_topics.map((item, index) =><Homeli  {...item} key={index} />):
                            this.state.recent_replies.map((item, index) =><Homeli  {...item} key={index} />)
                    }
                </ul>
                
            </div>
        );
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.username,
            dispatch: this.props.dispatch
        };

    }
    componentDidMount() {
        this.state.dispatch(fetchUser(this.state.username));
        // if(!this.props.items.data){
        //     fetchUser(this.state.username)
        // }
    }
    
    render() {
        const data = this.props.items.data;
        return (
            <div>
                <Header title="个人中心" out="y"/>
                {
                    this.props.isFetching ? <Loading loading={this.props.isFetching}></Loading>:<Home da={data}></Home>
                }
                <Footer index="3"></Footer>
            </div>
        );
    }
}

function user_mapStateToProps(state) {
    const {
        isFetching,
        items
    } = state.User || {
        isFetching: true,
        items: []
    };
    return {
        isFetching,
        items
    }
}

const UserView = connect(user_mapStateToProps)(Main);

export default UserView;

