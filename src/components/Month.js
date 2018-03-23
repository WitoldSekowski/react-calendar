import React, { Component } from 'react';
import Week from './Week';

export default class Month extends Component {

    constructor() {
        super();
        this.dayNames = [];
        this.day = null;
        this.month = null;
        this.daysCount = null;
        this.daysCountPreviousMonth = null;
        this.daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.state = {
            currentMonth: 1
        }
    }

    componentWillMount() {
        // const date = new Date();
        // const months = date.getMonth();
        // this.state.currentMonth = 6;
    }

    componentDidMount() {
        
    }

    previousMonth() {  
        this.setState({ currentMonth: this.state.currentMonth - 1 })
        this.dayNames = [];
    }

    nextMonth() {  
        this.setState({ currentMonth: this.state.currentMonth + 1 })
        this.dayNames = [];
    }

    render() {
        return (
            <div className="calendar-wrapper">
                <button onClick={this.previousMonth}>previous Month</button>  
                <button onClick={this.nextMonth}>next Month</button>  
                <div className="calendarGrid ">
                    {this.dateToMonth( this.state.currentMonth)}
                    {
                        this.prepareMonthDays()
                    }
                </div>
            </div>
        )
    }

    prepareMonthDays() {
        let week = [];
        let weeksArray = [];

        this.daysCount = new Date(2018, this.state.currentMonth, 0).getDate();
        
        if (this.month == 0) {
            this.daysCountPreviousMonth = new Date(2017, 12, 0).getDate()
        } else {
            this.daysCountPreviousMonth = new Date(2018,  this.state.currentMonth-1, 0).getDate()
        }

        for (let day = 1; day <= this.daysCount; day++) {
            let dateIter = new Date(2018,  this.state.currentMonth-1, day);
            let dayIter = dateIter.getDay();
            let dayName = this.dateToDay(dayIter);
            this.dayNames.push(dayName);
        }

        let dayz = this.dayNames.map((dayx, key) => {
            //first day of month
            //days from previous month
            if (key == 0) {
                let firstDay = this.daysArr.indexOf(dayx) - 1;
                if (dayx == "Sunday") {
                    firstDay = 6;
                }
                for (var i = 0; i < firstDay; i++){
                    week.push({'previousMonthDay':i, 'dayNumber':(this.daysCountPreviousMonth-firstDay + i +1)});
                }
            }

            //days from current month
            week.push([dayx,key+1]);

            //week end
            if (dayx == 'Sunday') {
                weeksArray.push(<Week key={key} days={week}/>)
                week = [];
            }

            //last day of month
            //days in next month
            if (key == this.dayNames.length - 1 ) {
                
                let lastDay = this.daysArr.indexOf(dayx) - 1;
                console.log('lastDay');
                console.log(lastDay);
                if (lastDay != -1) {
                    for (var i = 1; i < 7 - lastDay; i++){
                        week.push({'nextMonthDay':lastDay+i, 'dayNumber':i});
                    }
    
                    weeksArray.push(<Week key={key} days={week}/>)
                    week = [];
                }
            }
        })
        return weeksArray;
    }

    dateToDay(dayIter) {
        let day = this.daysArr[dayIter];
        return day;
    }

    dateToMonth(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
        let monthName = months[month-1];
        return (<h4>{monthName}</h4>);
    }
}