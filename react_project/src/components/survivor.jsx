import React, { Component } from 'react';

class Survivor extends Component {
    render() {
        return (
            <div className=''>
                <span className={this.getBadgeClasses()}>{"Hunt XP: " + this.formatXp()}</span>
                <button onClick={() => this.props.onIncrement(this.props.survivor.id)} className='btn btn-secondary btn-sm'>Add XP</button>
                <button onClick={() => this.props.onDecrease(this.props.survivor.id)} className='btn btn-secondary btn-sm m-2'>Subtract XP</button>
                {this.props.survivor.alive === true && this.props.survivor.huntXp === 0 && "New Survivor"}
                {this.props.survivor.alive === false && <span className="badge p-2 m-2 bg-danger">Dead</span>}
                {this.props.survivor.alive === true && <button onClick={() => this.props.onKill(this.props.survivor.id)} className='btn btn-secondary btn-sm m-2'>Kill</button>}
            </div>
        );  
    }

    getBadgeClasses() {
        let classes = "badge p-2 m-2 bg-";
        classes += (this.props.survivor.huntXp === 0 ? "primary" : "success" | this.props.survivor.huntXp === 10 ? "danger" : "success");
        return classes;
    }

    formatXp(){
        const {huntXp} = this.props.survivor;
        return huntXp === 10 ? 'Retired' : huntXp
    }
}
 
export default Survivor;