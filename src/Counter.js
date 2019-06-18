import React from 'react';

class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 10,
            running: false,
            mode: "Session",
            normalLength: 120,
            shortLength: 60
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
                this.setState({count: this.state.shortLength, mode: "Break"});
            } else if (this.state.mode === "Break") {
                this.setState({count: this.state.normalLength, mode: "Session"});
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
            count: this.state.normalLength,
            mode: "Session",
            running: false
        })
        clearInterval(this.myVar);
    }



    render() {
        return(
            <div className="container">
                <div>Break Length</div>
                <div>{this.state.mode}</div>
                <div>Session Length</div>
                <div>{Math.floor(this.state.shortLength / 60)}</div>
                <div></div>
                <div>{Math.floor(this.state.normalLength / 60)}</div>
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


export default Counter