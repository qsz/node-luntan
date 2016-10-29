import React, { Component } from 'react';
import Cell from './Cell';

export default class CellView extends Component {
    render() {
        return (
            <div>
                <ul className="index-list">
                    {
                        this.props.items.data.map((item, index) =>
                            <Cell {...item} key={index} />
                        )
                    }
                </ul>
            </div>
        );
    }
};