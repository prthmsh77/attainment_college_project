import Navbar from '../Component/navbar';
import './secondpg.css'
import React, { useState } from 'react';
import axios from 'axios';
import LabelComponent from '../Component/LabelComponent';
// import Button from '../Component/button';

function SecondPg() {
    const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        });

    }

    return (
        <div className='second-page'>
            <div className='second-page-navbar'>
                <Navbar />
            </div>
            <div className='second-page-containt'>
                <div className='upload'>
                    <form>
                        <label for="images" class="drop-container" id="dropcontainer">
                            <span class="drop-title">Drop files here</span>
                            or
                            <input type="file" id="images" accept="image/*" required></input>
                        </label>
                    </form>
                </div>
                <div className='marksinput'>
                    <LabelComponent/>
                    <LabelComponent/>
                    <LabelComponent/>
                </div>
            </div>
        </div>
    );
}
export default SecondPg;


