import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Pendingreq = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        const requestData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/verification/admin/pendingreq')
                if (response.status === 200) {
                    setData(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        requestData()
    }, [])
    return (
        <>
            <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Sr no</div>
                        <div className="col col-2">Company Email</div>
                        <div className="col col-3">Student Count</div>
                        <div className="col col-4">Status</div>
                    </li>
                    {data.map((item, index) => {
                        return (
                            <li className="table-row" key={index}>
                                <div className="col col-1" data-label="Sr no">{index + 1}</div>
                                <div className="col col-2" data-label="Company Email">{item.email}</div>
                                <div className="col col-3" data-label="Student Count">{item.studentsCount}</div>
                                {item.isVerified && <div className="col col-4" data-label="Status" style={{ color: "green" }}>Verified</div>}
                                {!item.isVerified && <div className="col col-4" data-label="Status" style={{ color: "red" }}>Pending</div>}
                            </li>
                        )
                    })}

                </ul>
            </div>
        </>
    );
};

export default Pendingreq;