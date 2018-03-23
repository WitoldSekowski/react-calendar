import React, { Component } from 'react';
import './Modal.css';


export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            hour: null,
            desc: null,
        }
        this.dismissModal = this.dismissModal.bind(this);
        this.saveEvent = this.saveEvent.bind(this)
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextprops')
        console.log(nextProps.isVisible)
        console.log('props')
        console.log(this.state.isVisible)
        if (this.state.isVisible != nextProps.isVisible) {
            this.setState({
                isVisible: nextProps.isVisible
            })
        }
    }

    render() {
        // console.log(this.state.isVisible)
        if (this.state.isVisible == false) {
            return null;
        } else {
            return (
                <div className="background-modal">
                    
                    <div className="modal">
                    <span onClick={this.dismissModal}>X</span>        
                    <div className="header">    DAY  {this.props.dayNumber} EVENT</div>
                        <input placeholder="add hour of event" onChange={this.handleHourChange} />
                            <input placeholder="description" onChange={this.handleDescChange}  />
                        <button onClick={this.saveEvent}>Save event</button>
                    </div>
                </div>
            )
        }
    }

    saveEvent() {
        this.props.saveEvent(this.state);
    }
    
    handleHourChange(event) {
        this.setState({
            hour: event.target.value
        })
    }
    handleDescChange(event) {
        this.setState({
            desc: event.target.value
        })
    }

    dismissModal() {
        this.setState({
            isVisible: false
        })
    }
}