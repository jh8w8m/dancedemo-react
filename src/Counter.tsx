import React, { FC, useRef, VideoHTMLAttributes } from 'react';
import './Counter.scss'

type Counter = {
    counts: number,
}

const Counter: FC<Counter> = (props) => {
    const {
        counts,
    } = props;

    return(
        <div className="scoreCounter">Score: {counts}</div>
    )
}


export default Counter;