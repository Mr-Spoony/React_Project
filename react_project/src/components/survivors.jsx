import React, { Component } from 'react';
import Survivor from './survivor';

class Survivors extends Component {
    state = { 
        totalSurvivors: 0,
        survivors: [
            {id: 1, name: "Dave", huntXp: 10, alive: true},
            {id: 2, name: "Jane", huntXp: 6, alive: true},
            {id: 3, name: "Greg", huntXp: 0, alive: true},
        ]
    }
    
    

    createSurvivor = () => {
        this.setState();
    }

    handleKillSurvivor = id => {
        this.setState({survivors: this.state.survivors.map(survivor => {
            if (survivor.id === id) {
                survivor.alive = false;
                return survivor;
            }
            return survivor;
        })});
    }

    handleXpIncrement = id => {
        this.setState({survivors: this.state.survivors.map(survivor => {
            if (survivor.id === id) {
                survivor.huntXp++;
                return survivor;
            }
            return survivor;
        })});
    }

    handleXpDecrease = id => {
        this.setState({survivors: this.state.survivors.map(survivor => {
            if (survivor.id === id) {
                survivor.huntXp--;
                return survivor;
            }
            return survivor;
        })});
    }

    render() { 
        return (
        <div>
            <span className={this.getBadgeClasses()}>{"Total Alive: " + this.formatPop()}</span>
            <button onClick={this.createSurvivor} className='btn btn-secondary btn-sm'>Add Survivor</button>
            { this.state.survivors.map(survivor =>
                <Survivor 
                key={survivor.id} 
                onKill={this.handleKillSurvivor}
                onIncrement={this.handleXpIncrement}
                onDecrease={this.handleXpDecrease} 
                survivor={survivor} 
                selected={true}/>
            )}
        </div>);
    }

    getBadgeClasses() {
        let classes = "badge p-2 m-2 bg-";
        classes += (this.state.totalSurvivors === 0 ? "warning" : "success");
        return classes;
    }

    formatPop(){
        const {totalSurvivors} = this.state;
        let count = 0;
        this.state.survivors.forEach(survivor => {
            if(survivor.alive === true){
                count++
            }
        });
        return totalSurvivors === 0 ? 'All Dead' : count;
    }
}
 
export default Survivors;