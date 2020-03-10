import React from 'react';
import MarbleLane from './marbleLane';
import Operator from './operator';

export default function marbleOperatorSet(props) {
    return (
        <div>
            {/* {props.operator && <Operator function={props.operator}></Operator>} */}
            {props.operator && <Operator fn={props.operator}></Operator>}
            <MarbleLane marbles={props.marbles}></MarbleLane>
        </div>
    );
}