import React, { useState } from 'react';
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../init-firebase';
import './addSurvivor.css';


export default function AddSurvivor(props) {
    const [name, setName] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (name === '') {
            return
        }
        const survivorCollectionRef = collection(db, 'survivors')
        addDoc(survivorCollectionRef, {name: name, huntXp: 0, alive: true})
        .then(response => {console.log(response.id)
        }).catch(error => {
            console.log(error.message)
        })
        props.setTrigger(false)
        setName('')
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='pupup-inner bg-secondary p-4 rounded'>
                <h4 className='text-white'>Add Survivor</h4>
                <form onSubmit={handleSubmit}>
                    <label className='text-white' htmlFor='name'>Survivor Name</label>
                    <input className='d-block' 
                    id='name'
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}/> 

                    <button className='btn btn-success mt-2 me-2 btn-sm close-btn' type='submit'>Add Survivor</button>
                    <button onClick={() => props.setTrigger(false)} className='mt-2 btn btn-danger btn-sm close-btn' type='submit'>Cancel</button>
                {props.children}
                </form>
                
            </div>
        </div>
    ) : "";
}