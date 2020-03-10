import React from 'react';
import Marble from './marble';
import './marbleLane.css';
import * as uuid from 'uuid/v4'

export default function MarbleLane(props) {

    const color = index => index % 5;
    const marbles = props.marbles ? props.marbles : [];

    return (
        <div className="MarbleLane">
            {marbles.map((marble, index) => <Marble key={uuid()} value={marble} color={color(index)} />)}
        </div>
    );
}