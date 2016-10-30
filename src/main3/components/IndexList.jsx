import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactDOM,{render} from 'react-dom';
import {connect} from 'react-redux';
import {Footer} from './common/Index';
import CellView from './CellView';
import Loading from './common/Loading';
import { fetchIssuesIfNeeded } from '../Action/Index';





class Nav extends Component {
    render() {
        if (this.props.isFetching) {
            return null;
        };
        var setCur = {};
        setCur[this.props.tab] = 'on';
        return (
            <nav className="index-nav">
                <ul>
                    <li className={setCur.all}>
                        <Link to="/" activeClassName="active">全部</Link>
                    </li>
                    <li className={setCur.good}>
                        <Link to="/?tab=good" activeClassName="active">精华</Link>
                    </li>
                    <li className={setCur.share}>
                        <Link to="/?tab=share" activeClassName="active">分享</Link>
                    </li>
                    <li className={setCur.ask}>
                        <Link to="/?tab=ask" activeClassName="active">问答</Link>
                    </li>
                    <li className={setCur.job}>
                        <Link to="/?tab=job" activeClassName="active">招聘</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dispatch: this.props.dispatch,
            mag:false
        };
    }
    componentWillMount(){
    }
    componentDidMount() {  //此处要优化
        const tab = this.props.location.query.tab;
        const offsetY = this.props.offsetY;
        if(!this.props.items.data){
            this.state.dispatch(fetchIssuesIfNeeded(null, tab));
        }
        window.scrollTo(0,offsetY);
        window.addEventListener('scroll', this.startLoad.bind(this));//滚动加载
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.location.query.tab != nextProps.location.query.tab){
            this.setState({
                mag:false
            });
            const tab = nextProps.location.query.tab;
            this.state.dispatch(fetchIssuesIfNeeded(null, tab));
        }else{
            this.setState({
                mag:true
            })
        }
    }
    componentWillUnmount(){
        this.state.dispatch({type:'setY',setY:window.pageYOffset})  //此处要优化
    }
    startLoad(){
        const $load = this.refs.load;
        const maxH = document.documentElement.clientHeight+40;
        if($load){
            if($load.getBoundingClientRect()){
                if( $load.getBoundingClientRect().top <= maxH && $load.getBoundingClientRect().top>=200 ) {
                    if(!this.props. isFetching){
                        const items = this.props.items;
                        const tab = this.props.location.query.tab;
                        this.state.dispatch(fetchIssuesIfNeeded(items, tab, 2));
                    }
                }
            }
        }
    }

    render() {
        var tab = this.props.location.query.tab || 'all';
        return (
            <div className="index-list-box">
                <Nav tab={tab} />
                {
                    !this.props.items.data ? null:<CellView title="全部" items={this.props.items} />
                }
                <Footer index="0" />
                <div ref="load">
                    <Loading mag={this.state.mag} loading={this.props.isFetching}></Loading>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {
        isFetching,
        items,
        offsetY
    } = state.postIssues || {
        isFetching: true,
        items: [],
        offsetY:0
    };
    return {
        isFetching,
        items,
        offsetY
    }
}


export default connect(mapStateToProps)(Main);

