import React, { Component } from 'react';
import './survivors.css'

class Survivor extends Component {
    render() {
        return (
            <div className='d-flex d-flex-grow' >
                <span className='card fs-6 fw-normal fontFamily  badge bg-secondary mb-2 rounded'>
                    <span className={"badge fs-6 fw-normal fontFamily p-2 m-2 " + this.getIsAliveName()}>{this.props.survivor.data.name}</span>
                    <span className={this.getBadgeClasses()}>{"Hunt XP: " + this.formatXp()}</span>
                    <button onClick={() => this.props.onIncrement(this.props.survivor.id)} className='fs-6 fw-normal fontFamily  btn btn-secondary btn-sm'>Add XP</button>
                    <button onClick={() => this.props.onDecrease(this.props.survivor.id)} className='fs-6 fw-normal fontFamily  btn btn-secondary btn-sm m-2'>Subtract XP</button>
                    {this.props.survivor.data.alive === true && <button onClick={() => this.props.onStatus(this.props.survivor.id)} className='fs-6 fw-normal fontFamily  font-weight-bold btn btn-secondary btn-sm m-2'>Kill</button>}
                    {this.props.survivor.data.alive === false && <button onClick={() => this.props.onStatus(this.props.survivor.id)} className='fs-6 fw-normal fontFamily  font-weight-bold btn btn-secondary btn-sm m-2'>Revive</button>}
                    {this.props.survivor.data.alive === false && <span className="fs-6 fw-normal fontFamily badge p-2 m-2 bg-danger">Dead</span>}
                    <button onClick={() => this.props.onDelete(this.props.survivor.id)} className='fs-6 fw-normal fontFamily  btn btn-warning btn-sm m-2'>Delete</button>
                </span>
            </div>
        );  
    }

    getBadgeClasses() {
        let classes = "fs-6 fw-normal fontFamily badge p-2 m-2 bg-";
        classes += (this.props.survivor.data.huntXp === 0 ? "primary" : "success" | this.props.survivor.data.huntXp === 10 ? "danger" : "success");
        return classes;
    }

    getIsAliveName() {
        let classes = "bg-";
        classes += (this.props.survivor.data.alive === true ? "success" : "danger");
        return classes;
    }

    formatXp(){
        const {huntXp} = this.props.survivor.data;
        return huntXp === 10 ? 'Retired' : huntXp
    }
}
 
export default Survivor;