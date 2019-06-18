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
            count: this.state.sessionLength,
            mode: "Session",
            running: false
        })
        clearInterval(this.myVar);
    }




    render() {
        return(
            <div className="container">
                <div>Break Length</div>
                <div className="modeLabel">{this.state.mode}</div>
                <div>Session Length</div>
                <div><ArrowButton direction={"up"} type={"session"}/> {Math.floor(this.state.breakLength / 60)} <ArrowButton direction={"down"} type={"session"}/></div>
                <div></div>
                <div><ArrowButton direction={"up"} type={"break"}/> {Math.floor(this.state.sessionLength / 60)} <ArrowButton direction={"down"} type={"break"}/></div>
                <div className="clockButton"  onClick={this.toggleTimer}>Start/Stop</div>
                <div className="clockDisplay">
                    {Math.floor(this.state.count / 60) < 10 ? "0" + Math.floor(this.state.count / 60) : Math.floor(this.state.count / 60)}
                    :
                    {this.state.count % 60 < 10 ? "0" + this.state.count % 60 : this.state.count % 60}
                </div>
                <div className="clockButton" onClick={this.resetTimer}>Reset</div>
            </div>
        )
    }
}

function ArrowButton(props) {
    return(
        <button>
            <FontAwesomeIcon icon={props.direction === "up" ? faArrowUp : faArrowDown} />
        </button>
    )
}


export default Counter