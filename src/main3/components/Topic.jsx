import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactDOM,{render} from 'react-dom';
import {connect} from 'react-redux';

import Loading from './common/Loading';
import {Header,TipMsg} from './common/Index';
import { fetchTopic } from '../Action/Index';
import Tool from '../tools/Tools.jsx'

class ReplyBox extends Component{
    render() {
        return (
            <div>
                {
                    localStorage.username ?
                        <div className="reply-box">
                            <div className="reply-text">
                                <textarea placeholder="回复"></textarea>
                            </div>
                            <div className="btn-box clear">
                                <button>回复</button>
                            </div>
                        </div>
                        :<TipMsg></TipMsg>
                }
            </div>
        )
    }
}

class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create_at: '',
            liked:''
        };
    }
    componentDidMount() {  //此处要优化
        const dateBegin = this.props.create_at;
        var dateDiff = Tool.GetDateDiff(dateBegin);
        this.setState({
            create_at:dateDiff
        })
        // console.log(this.props)

        const ups = this.props.ups;
    }
    
    likeIt(reply_id){
        console.log(reply_id);
        if(!localStorage.username){
            window.location.hash = '#signin'
        }else{
            $.ajax({
                url: 'https://cnodejs.org/api/v1/reply/'+reply_id+'/ups' ,
                data:{accesstoken:localStorage.accesstoken},
                type:'POST',
                success: res => {
                    if(res.success){
                        this.setState({
                            liked:res.action
                        })
                    }else {
                        alert('点赞失败');
                    }
                },
                error: (err) => {
                    alert('点赞失败!');
                    console.log(err);
                }
            });
        }
    }
    render() {
        const index = this.props.index;
        const {content, author, ups, id} = this.props;
        const createMarkup = () => {
            return {
                __html: content
            }
        };
        return (
           <li className="clear">
               <div className="headimg">
                   <div className="user-headimg" style={{backgroundImage: 'url(' + author.avatar_url + ')'}}></div>
               </div>
               <div className="main">
                   <div className="mn">
                       <a className="name" href={'#user/'+author.loginname}>{author.loginname}</a>
                       <time>{this.state.create_at}</time>
                       <div className="lou">
                           <span>#{index+1}</span>
                       </div>
                   </div>
                   <div className="markdown-body" dangerouslySetInnerHTML={createMarkup()}></div>
                   <div className="bottom clear">
                       <i className={"iconfont"+' '+this.state.liked}onClick={this.likeIt.bind(this,id)}>&#xe650;</i>
                       <i className="ups-num"> {ups.length > 0 ? ups.length:null}</i>
                   </div>
               </div>

           </li>
        )
    }
}


class ReplyList extends Component {
    render() {
        const replies = this.props.reply;
        const createMarkup = () => {
            return {
                __html: content
            }
        }
        return (
            <div>
                <h3 className="reply-tit">共{replies.length}条回复</h3>
                <ul className="reply-list clear">
                    {
                        replies.map((item, index) =>
                            <Reply {...item} index={index} key={index} />
                        )
                    }
                </ul>
            </div>
        )
    }
}


class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            create_at: '',
            avatar_url:'',
            loginname:'',
            replies:[]
        };
    }

    componentWillMount(){ //此处要优化，为什么会这样。。。
        if(this.props.author){
            this.setState({
                avatar_url:this.props.author.avatar_url,
                loginname:this.props.author.loginname,
                replies:this.props.replies
            })
        }else{
            return false
        }

    }
    componentDidMount() {
        const dateBegin = this.props.create_at;
        var dateDiff = Tool.GetDateDiff(dateBegin);
        this.setState({
            create_at:dateDiff
        })
    }

    render() {
        const{id, title, visit_count, reply_count, content, replies, author} = this.props;
        const createMarkup = () => {
            return {
                __html: content
            }
        }
        return (
            <div>
                <div className="user clear">
                    <div className="user-headimg" style={{backgroundImage: 'url(' + this.state.avatar_url + ')'}}></div>
                    <div className="data">
                        <div>
                            <a className="name" href={'#user/'+this.state.loginname}>{this.state.loginname}</a>
                            <time>{this.state.create_at}</time>
                        </div>
                        <div className="qt">
                            <span>阅读:{visit_count}</span>
                            <span>回复:{reply_count}</span>
                        </div>
                    </div>
                </div>
                <h2 className="topic-tit">{title}</h2>
                <div className="markdown-body" dangerouslySetInnerHTML={createMarkup()}></div>
                <ReplyList reply={this.state.replies}></ReplyList>
            </div>
        )
    }
}








class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dispatch: this.props.dispatch
        };
    }
    componentWillMount() {
        const id = this.props.location.pathname.split('/').pop();
        this.state.dispatch(fetchTopic(id));
    }
    render() {
        return (
            <div>
                <Header title="详情" back="y"/>
                {
                    this.props.isFetching? <Loading loading={this.props.isFetching}></Loading> : <div className="article-box"><Article  {...this.props.article.data}/><ReplyBox></ReplyBox></div>
                }
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {
        isFetching,
        article
    } = state.Topic || {
        isFetching: true,
        article: {}
    };

    return {
        isFetching,
        article
    }
}



export default connect(mapStateToProps)(Topic);