import React, { Component } from 'react';

class Survivor extends Component {
    state = { 
        survivorPop: 10,
    };
    render() { 
        return (
            <React.Fragment>
                <h1>{"Survivors: " + this.formatPop()}</h1>
                <button>Increment</button>
            </React.Fragment>
        );  
    }

    formatPop(){
        const {survivorPop} = this.state;
        return survivorPop === 0 ? 'Zero' : survivorPop;
    }
}
 
export default Survivor;