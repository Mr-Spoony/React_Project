import React, { useState, useEffect } from 'react';
import {collection, onSnapshot, doc, setDoc, deleteDoc} from 'firebase/firestore'
import { db } from '../init-firebase';
import './survivors.css'
import Survivor from './survivor';
import AddSurvivor from './addSurvivor';


export default function Survivors() {
    const [survivors, setSurvivors] = useState([]);
    const [totalSurvivors, setTotalSurvivors] = useState(0);
    const survivorCollectionRef = collection(db, 'survivors')
    const [buttonPopup, setButtonPopup] = useState(false);

    useEffect (() => {
        getSurvivors()
    }, []);

    async function handleSurvivorDelete(id){
        await deleteDoc(doc(db, "survivors", id));
    }
    
    function handleXpDecrease(id){
        const newServivors = survivors.map(survivor => {
            if (survivor.id === id) {
                if(survivor.data.huntXp > 0)survivor.data.huntXp--;
                console.log(survivor)
                return survivor;
            }
            return survivor;
        })
        setSurvivors(newServivors)
    }

    function handleXpIncrement(id){
        const newServivors = survivors.map(survivor => {
            if (survivor.id === id) {
                if(survivor.data.huntXp < 10)survivor.data.huntXp++;
                console.log(survivor)
                return survivor;
            }
            return survivor;
        })
        setSurvivors(newServivors)
    }

    function handleStatus(id){
        const newServivors = survivors.map(survivor => {
            if (survivor.id === id) {
                if(survivor.data.alive === false){
                    survivor.data.alive = true;
                    setTotalSurvivors(totalSurvivors + 1)
                } else{
                    survivor.data.alive = false;
                    setTotalSurvivors(totalSurvivors - 1)
                }
                console.log(survivor)
                return survivor;
            }
            return survivor;
        })
        setSurvivors(newServivors) 
    }

    function getSurvivors() {
        
        onSnapshot(survivorCollectionRef, (snapshot) => {
            const survivors = snapshot.docs.map(s => ({
                data: s.data(), 
                id: s.id,
            }))
            setSurvivors(survivors)
            let count = 0
            survivors.forEach(survivor => {
                if(survivor.data.alive === true){
                    setTotalSurvivors(count = count + 1)
                }
            });
            if(survivors.length === 0){
                setTotalSurvivors(0)
            }
        })
        
    }

    function getBadgeClasses() {
        let classes = "badge ms-1 p-2 bg-";
        classes += (totalSurvivors === 0 ? "danger" : "success");
        return classes;
    }

    function updateSurvivors()  {
        survivors.forEach(async survivor => {
            const survivorDocRef = doc(db, "survivors", survivor.id);
            await setDoc(survivorDocRef, {
                name: survivor.data.name,
                huntXp: survivor.data.huntXp,
                alive: survivor.data.alive,
            });
        });
        alert("updated to survivors")
    }
    
    return (
        <div className='container'>
            <AddSurvivor trigger={buttonPopup} setTrigger={setButtonPopup}>
            </AddSurvivor>
            <button onClick={() => updateSurvivors()} className='fs-6 fw-normal fontFamily btn btn-secondary btn-sm ms-2'>Update Survivors</button>
            <button onClick={() => setButtonPopup(true)} className='fs-6 fw-normal fontFamily btn btn-secondary btn-sm ms-2'>Add Survivors</button>
            <span className="fs-6 fw-normal fontFamily badge m-2 bg-secondary">
                Total Survivors
                <span className={getBadgeClasses()}>{totalSurvivors}</span>
            </span>
            <div className='ms-2'>
                {survivors.map(survivor =>(
                    <Survivor 
                    key={survivor.id} 
                    survivor={survivor} 
                    selected={true}
                    onStatus={handleStatus}
                    onIncrement={handleXpIncrement}
                    onDecrease={handleXpDecrease}
                    onDelete={handleSurvivorDelete}/>
                ))}
            </div>
            
            
            
        </div>
    )
}