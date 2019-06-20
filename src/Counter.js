import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';


class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 1500,
            running: false,
            mode: "Session",
            sessionLength: 1500,
            breakLength: 300
        }
        this.myVar = null;

    }

    handleCounter = () => {
        if (this.state.count > 0) {
            this.setState({
                count: this.state.count - 1
            });
        } else if (this.state.count === 0) {
            if (this.state.mode === "Session") {
                this.setState({count: this.state.breakLength, mode: "Break"});
            } else if (this.state.mode === "Break") {
                this.setState({count: this.state.sessionLength, mode: "Session"});
            }
        }
    }

    toggleTimer = () => {
        if(!this.state.running) {
            this.myVar = setInterval(this.handleCounter, 1000);
            this.setState({
                running: true
            })
        } else {
            clearInterval(this.myVar);
            this.setState({
                running: false
            })

        }
    }

    resetTimer = () => {
        this.setState({
            mode: "Session",
            running: false,
            count: 1500,
            breakLength: 300,
            sessionLength: 1500
        })
        clearInterval(this.myVar);
    }

    // this needs fixing for adjusting break session length and updating count
    changeTime = (mode, direction) => {
        if(this.state.running === false){
            if (mode === "break") {
                if (direction === "up") {
                    this.setState({
                        breakLength: this.state.breakLength <= 3540 ? this.state.breakLength + 60 : this.state.breakLength
                    });
                } else {
                    this.setState({
                        breakLength: this.state.breakLength > 60 ? this.state.breakLength - 60 : this.state.breakLength
                    });
                }
            } else {
                if (direction === "up") {
                    this.setState({
                        sessionLength: this.state.sessionLength <= 3540 ? this.state.sessionLength + 60 : this.state.sessionLength,
                        count: this.state.count <= 3540 ? this.state.sessionLength + 60 : this.state.sessionLength
                    });
                } else {
                    this.setState({
                        sessionLength: this.state.sessionLength > 60 ? this.state.sessionLength - 60 : this.state.sessionLength,
                        count: this.state.count >= 120 ? this.state.sessionLength - 60 : this.state.sessionLength
                    });
                }
            }
            
        }
    }


    render() {
        return(
            <div className="container">
                <div id="break-label">Break Length</div>
                <div id="timer-label" className="modeLabel">{this.state.mode}</div>
                <div id="session-label">Session Length</div>
                <div><ArrowButton id="break-increment" direction={"up"} mode={"break"} clicked={this.changeTime}/> <span id="break-length">{Math.floor(this.state.breakLength / 60)}</span> <ArrowButton id="break-decrement" direction={"down"} mode={"break"} clicked={this.changeTime}/></div>
                <div></div>
                <div><ArrowButton id="session-increment" direction={"up"} mode={"session"} clicked={this.changeTime}/> <span id="session-length">{Math.floor(this.state.sessionLength / 60)}</span> <ArrowButton id="session-decrement" direction={"down"} mode={"session"} clicked={this.changeTime}/></div>
                <div id="start_stop" className="clockButton" onClick={this.toggleTimer}>Start/Stop</div>
                <ClockDisplay time={this.state.count}/>
                <div id="reset" className="clockButton" onClick={this.resetTimer}>Reset</div>
            </div>
        )
    }
}

function ArrowButton(props) {
    return(
        <button id={props.id} onClick={() => props.clicked(props.mode, props.direction)}>
            <FontAwesomeIcon icon={props.direction === "up" ? faArrowUp : faArrowDown} />
        </button>
    )
}

function ClockDisplay(props) {
    return(
        <div id="time-left" className="clockDisplay" >
            {Math.floor(props.time / 60) < 10 ? "0" + Math.floor(props.time / 60) : Math.floor(props.time / 60)}
            :
            {props.time % 60 < 10 ? "0" + props.time % 60 : props.time % 60}
        </div>
    )
}

export default Counter