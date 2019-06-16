import React from 'react';

class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 1500,
            running: false
            
        }
        this.myVar = null;
    }

    incrementCounter = () => {
        this.setState({
            count: this.state.count - 1
        });
    }

    toggleTimer = () => {
        if(!this.state.running) {
            this.myVar = setInterval(this.incrementCounter, 1000);
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

    render() {
        return(
            <div><button onClick={this.toggleTimer}>{Math.floor(this.state.count / 60)}:{this.state.count % 60}</button></div>
        )
    }
}


export default Counter