import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';


class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 10,
            running: false,
            mode: "Session",
            sessionLength: 120,
            breakLength: 60
        }
        this.myVar = null;

    }

    handleCounter = () => {
        if (this.state.count > 1) {
            this.setState({
                count: this.state.count - 1
            });
        } else {
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
            sessionLength: 1500,
            breakLength: 300,
            count: 1500
        })
        clearInterval(this.myVar);
    }

    changeTime = (mode, direction) => {
        if (mode === "break") {
            if (direction === "up") {
                this.setState({breakLength: this.state.breakLength < 3600 ? this.state.breakLength + 60 : this.state.breakLength});
            } else {
                this.setState({breakLength: this.state.breakLength > 60 ? this.state.breakLength - 60 : this.state.breakLength});
            }
        } else {
            if (direction === "up") {
                this.setState({sessionLength: this.state.sessionLength < 3600 ? this.state.sessionLength + 60 : this.state.sessionLength});
            } else {
                this.setState({sessionLength: this.state.sessionLength > 60 ? this.state.sessionLength - 60 : this.state.sessionLength});
            }
        }
    }

    render() {
        return(
            <div className="container">
                <div>Break Length</div>
                <div className="modeLabel">{this.state.mode}</div>
                <div>Session Length</div>
                <div><ArrowButton direction={"up"} mode={"break"} clicked={this.changeTime}/> {Math.floor(this.state.breakLength / 60)} <ArrowButton direction={"down"} mode={"break"} clicked={this.changeTime}/></div>
                <div></div>
                <div><ArrowButton direction={"up"} mode={"session"} clicked={this.changeTime}/> {Math.floor(this.state.sessionLength / 60)} <ArrowButton direction={"down"} mode={"session"} clicked={this.changeTime}/></div>
                <div className="clockButton"  onClick={this.toggleTimer}>Start/Stop</div>
                <ClockDisplay time={this.state.count}/>
                <div className="clockButton" onClick={this.resetTimer}>Reset</div>
            </div>
        )
    }
}

function ArrowButton(props) {
    return(
        <button onClick={() => props.clicked(props.mode, props.direction)}>
            <FontAwesomeIcon icon={props.direction === "up" ? faArrowUp : faArrowDown} />
        </button>
    )
}

function ClockDisplay(props) {
    return(
        <div className="clockDisplay">
            {Math.floor(props.time / 60) < 10 ? "0" + Math.floor(props.time / 60) : Math.floor(props.time / 60)}
            :
            {props.time % 60 < 10 ? "0" + props.time % 60 : props.time % 60}
        </div>
    )
}

export default Counter