import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactDOM,{render} from 'react-dom';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mag:'loading-down',
            loading:this.props.loading
        };
    }
    componentWillMount(){
        const mag = this.props.mag;
        if(mag){
            this.setState({
                mag:'loading-up'
            })
        }else{
            this.setState({
                mag:'loading-down'
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            loading:nextProps.loading
        })
        const mag = this.props.mag;
        if(mag){
            this.setState({
                mag:'loading-up'
            })
        }else{
            this.setState({
                mag:'loading-down'
            })
        }

    }
    render(){
        return(
            <div className={ this.state.loading ? 'loading-box':'not-loading'} id={this.state.mag}>
                <div className="slide">
                    <ul>
                        <li className="circle1 circle"></li>
                        <li className="long"></li>
                        <li className="circle2 circle"></li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li className="circle1 circle"></li>
                        <li className="long"></li>
                        <li className="circle2 circle"></li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li className="circle1 circle"></li>
                        <li className="long"></li>
                        <li className="circle2 circle"></li>
                    </ul>
                </div>
            </div>
        )

    }
}

export default Loading