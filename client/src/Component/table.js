import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css';

function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Replace with your API endpoint
        axios.get('https://api.example.com/table-data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='table'>
            <section>
                <h1>Fixed Table Header</h1>
                <div className="table-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Company</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="table-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.code}</td>
                                    <td>{row.company}</td>
                                    <td>{row.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Table;
