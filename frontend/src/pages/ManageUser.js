import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ManageUser = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/verification/admin/getusers', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    setUser(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (email) => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/deleteuser', {
                email: email
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setUser(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Sr no</div>
                        <div className="col col-2">User Email</div>
                        <div className="col col-3">Action</div>
                    </li>
                    {user.map((item, index) => {
                        return (
                            <li className="table-row" key={index}>
                                <div className="col col-1" data-label="Sr no">{index + 1}</div>
                                <div className="col col-2" data-label="User Email">{item.email}</div>
                                <div className="col col-3" style={{display: "flex", justifyContent: "end"}} data-label="Action">
                                <FaEdit style={{marginRight: "10px"}} className="btn_circle_normal" />
                                <FaTrash style={{marginRight: "10px"}} className="btn_circle_normal" onClick={() => deleteUser(item.email)}/>
                                </div>
                            </li>
                        );
                        })

                    }
                </ul>
                <button className="btn"
                    style={{cursor: "pointer", float: "right", borderRadius:"40px" }} ><i className="fa fa-plus"></i>
                </button>
            </div>

        </>
    );
};

export default ManageUser;