
import React from 'react'
import './firstpg.css'
import Button from '../Component/button';
import Navbar from '../Component/navbar';
import { useNavigate } from 'react-router-dom';
const FirstPg=()=>{

    const navigate=useNavigate();

    return(
        <div className='firstpg'>
            <div className='upperblock'>
                <div className='navbar'>
                <Navbar/>
                </div>
                
                <p>D.Y.Patil College Of Engineering Akurdi</p>
                <div className='firstpg-buttons'>
                <Button Title='Attainment' onclick={()=>{navigate('secondpg')}}/>
                </div>
            </div>
        </div>
    );
}

export default FirstPg;