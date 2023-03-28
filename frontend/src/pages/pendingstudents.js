import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Pendingstudents = () => {

    // const [data, setData] = useState([])
    // useEffect(() => {
    //     const requestData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/verification/admin/getstudents')
    //             if (response.status === 200) {
    //                 setData(response.data.data)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     requestData()
    // }, [])
    return (
        <>
            {/* <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Sr no</div>
                        <div className="col col-2">Student Name</div>
                        <div className="col col-3">Status</div>
                    </li>
                    {data.map((item, index) => {
                        return (
                            <li className="table-row" key={index}>
                                <div className="col col-1" data-label="Sr no">{index + 1}</div>
                                <div className="col col-2" data-label="Student Name">{item.name}</div>
                                {item.isVerified && <div className="col col-3" data-label="Status" style={{ color: "green" }}>Verified</div>}
                                {!item.isVerified && <div className="col col-3" data-label="Status" style={{ color: "red" }}>Pending</div>}
                            </li>
                        )
                    })}

                </ul>
            </div> */}
            <h1>
                Pending Student
            </h1>
        </>
    );
};

export default Pendingstudents;