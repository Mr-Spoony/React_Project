import React, { useState } from 'react';
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../init-firebase';
//import Survivors from './survivors';


export default function AddSurvivor() {
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
        alert(name+" added to survivors")
    }

    return (
        <div>
            <h4>Add Survivor</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Survivor Name</label>
                <input 
                id='name'
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}/>
                <button type='submit'>Add Survivor</button>
            </form>
        </div>
    )
}