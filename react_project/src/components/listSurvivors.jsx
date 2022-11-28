import React, { useState, useEffect } from 'react';
import {collection, getDocs} from 'firebase/firestore'
import { db } from '../init-firebase';
import Survivors from './survivors';
import Survivor from './survivor';
import AddSurvivor from './addSurvivor';


export default function ListSurvivors() {
    const [survivors, setSurvivors] = useState([]);
    
    useEffect (() => {
        getSurvivors()
    }, []);

    useEffect (() => {
        console.log(survivors)
    }, [survivors]);
    

    function handleXpDecrease(id){
        survivors.map(survivor => {
            if (survivor.id === id) {
                if(survivor.data.huntXp > 0)survivor.data.huntXp--;
                console.log(survivor)
                return survivor;
            }
            return survivor;
        })
    }

    function handleXpIncrement(id){
        survivors.map(survivor => {
            if (survivor.id === id) {
                if(survivor.data.huntXp < 10)survivor.data.huntXp++;
                console.log(survivor)
                return survivor;
            }
            return survivor;
        })
    }

    function handleKillSurvivor(id){
        survivors.map(survivor => {
            if (survivor.id === id) {
                survivor.data.alive = false;
                console.log(survivor)
                return survivor;
            }
            return survivor;
        })
    }

    function getSurvivors() {
        const survivorCollectionRef = collection(db, 'survivors')
        getDocs(survivorCollectionRef)
            .then(response => {
                const survivors = response.docs.map(doc => ({
                    data: doc.data(), 
                    id: doc.id,
                }))
                setSurvivors(survivors)
            })
            .catch(error => console.log(error.message))
    }
    
    return (
        <div>
            <button onClick={() => getSurvivors} className='btn btn-secondary btn-sm m-2'>Get Survivors</button>
            {/* <Survivors survivors={survivors}/> */}
            <ul>
                {survivors.map(survivor =>(
                    <Survivor 
                    key={survivor.id} 
                    survivor={survivor} 
                    selected={true}
                    onKill={handleKillSurvivor}
                    onIncrement={handleXpIncrement}
                    onDecrease={handleXpDecrease}/>
                ))}
            </ul>
            <AddSurvivor />
        </div>
    )
}