import React, { Component } from 'react';
import { Router, Route, hashHistory,browserHistory,IndexRoute, Link, IndexLink ,IndexRedirect } from 'react-router';
import Tool from '../tools/Tools.jsx'



class TabIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tab: this.props.tab,
            top: this.props.top,
            good:this.props.good,
            icon:'&#xe729;',
            color:'#ff6347'
        };
    }
    componentWillMount() {
        if(!this.state.top){
            if(this.state.good){
                this.setState({
                    icon:'&#xe60d;',
                    color:'#dda0dd'
                })
            }
            if(!this.state.good){
                switch (this.state.tab)
                {
                    case 'share':
                        this.setState({
                            icon:'&#xe654;',
                            color:'#66cdaa'
                        })
                        break;
                    case 'ask':
                        this.setState({
                            icon:'&#xe662;',
                            color:'#4169e1'
                        })
                        break;
                    case 'job':
                        this.setState({
                            icon:'&#xe62d;',
                            color:'#ff8c00'
                        })
                        break;
                    default:
                        this.setState({
                            icon:'&#xe654;',
                            color:'#66cdaa'
                        })
                }
            }
        }
    }
    render(){
        const icon = this.state.icon;
        return (
            <i className="iconfont icon" style={{backgroundColor:this.state.color}} ref="icon" dangerouslySetInnerHTML={{__html: icon}}>

            </i>

        )

    }
}

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create_at: '',
            last_reply_at:''
        };
    }
    componentDidMount() {  
        //时间处理
        const dateBegin = this.props.create_at;
        const lastBegin = this.props.last_reply_at;
        var dateDiff = Tool.GetDateDiff(dateBegin);
        var lastDiff = Tool.GetDateDiff(lastBegin);
        this.setState({
            create_at:dateDiff,
            last_reply_at:lastDiff
        })
    }
    render() {
        const {top,tab, good, title, author, reply_count, visit_count}=this.props;
        const headImg = author.avatar_url;
        return (
            <li className="list-post">
                <Link to={'topic/'+this.props.id} activeClassName="active">
                    <div className="tit">
                        {
                            tab?<TabIcon tab={tab} top={top} good={good}></TabIcon>:null
                        }
                        <h3>{title}</h3>
                    </div>
                    <div className="bottom">
                        <div className="author">
                            <div className="user-headimg" style={{backgroundImage: 'url(' + headImg + ')'}}></div>
                        </div>
                        <div className="con">
                            <p>
                                <span>{author.loginname}</span>
                                <span className="right">{reply_count+'/'+visit_count}</span>
                            </p>
                            <p>
                                <span>{this.state.create_at}</span>
                                <span className="right">{this.state.last_reply_at}</span>
                            </p>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
};