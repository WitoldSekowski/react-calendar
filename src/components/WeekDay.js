import React, { Component } from 'react';
import Modal from './Modal.js'
import './WeekDay.css';

export default class WeekDay extends Component {
    constructor(props) {
        super(props);
        this.dayNameMonth = null;
        this.hour = null;
        this.desc = null;
        this.addEvent = this.addEvent.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        this.state = {
            isVisible: false,
            isSaved: false,
        }
    }

    setDay() {
        switch (this.props.dayName.nextMonthDay || this.props.dayName.previousMonthDay) {
            case 0:
                this.dayNameMonth = 'Monday';
                return 'Monday';
                break;
            case 1:
                this.dayNameMonth = 'Tuesday';
                return 'Tuesday';
                break;
            case 2:
                this.dayNameMonth = 'Wednesday';
                return 'Wednesday';
                break;
            case 3:
                this.dayNameMonth = 'Thursday';
                return 'Thursday';
                break;
            case 4:
                this.dayNameMonth = 'Friday';
                return 'Friday';
                break;
            case 5:
                this.dayNameMonth = 'Saturday';
                return 'Saturday';
                break;
            case 6:
                this.dayNameMonth = 'Sunday';
                return 'Sunday';
                break;
        }
    }

    render() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.setDay()
        return (
            <div className="weekday-wrapper">
                <div className="weekday-container">
                   
                    {(() => {
                        let day;
                        let number;
                        let classCss;
                        if (this.props.dayName.previousMonthDay != null) {
                            day = this.dayNameMonth;
                            number = this.props.dayName.dayNumber;
                            classCss = 'previousMonth';
                        } else if (this.props.dayName.nextMonthDay != null) {
                            day = this.dayNameMonth;
                            number = this.props.dayName.dayNumber;
                            classCss = 'nextMonth';
                        } else {
                            day = this.props.dayName[0];
                            number = this.props.dayName[1];
                            classCss = 'normalMonth';
                        }

                        return (<div>
                            <div className={classCss}>
                                <h4>{day}</h4>
                                <div className="weekday-number">
                                    <h3>{number}</h3>
                                </div>
                                {(() => {
                                    if (this.state.isSaved == true) {
                                        return (
                                            <div>Event time: <span>{this.hour}</span>
                                                <br />Event desc: <span>{this.desc}</span>
                                            </div>
                                        )
                                    }
                                })()}
                            </div>
                            <div className="action-container">
                                <button className="add-event" onClick={this.addEvent}>Add Event</button>
                                <button className="add-alarm">Add Alarm</button>
                            </div>
                            <Modal saveEvent={this.saveEvent} isVisible={this.state.isVisible} dayNumber={this.props.dayName[1]} />
                        </div>)
                    })()}

                </div>
            </div>)
    }

    addEvent() {
        this.setState({
            isVisible: true,
        })
    }

    saveEvent(value) {
        this.hour = value.hour;
        this.desc = value.desc;
        this.setState({
            isVisible: false,
            isSaved: true
        })
    }

    dateToDayNumber(date) {
        let dayNumber = new Date(date).getDate();
        return dayNumber;
    }
}