import React, { Component } from 'react';
import WeekDay from './WeekDay'
import './Week.css';

export default class Week extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="flex-row">
                {this.props.days.map((day, iter) => {
                    return <WeekDay key={iter} dayName={day} dayNumber={day.dayNumber}/>
                }) }
               
            </div>
        )
    }
}