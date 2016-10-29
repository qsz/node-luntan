import { Router, Route, hashHistory,browserHistory,IndexRoute, Link, IndexLink ,IndexRedirect } from 'react-router';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

function mapStateToProps(state) {
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


export default connect(mapStateToProps)(Roots);