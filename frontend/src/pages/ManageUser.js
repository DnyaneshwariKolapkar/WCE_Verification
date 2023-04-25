import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaTimes, FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { InfoToast } from '../components/toaster';

const ManageUser = () => {
    const [Users, setUsers] = useState([]);
    const [edit, setEdit] = useState([false, '']);
    const [create , setCreate] = useState(false);
    const [newuser, setNewuser] = useState({
        name: '',
        email: '',
    });
    const [password, setPassword] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/verification/admin/getusers', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 200) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = async (email) => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/deleteuser', {
                email: email
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 200) {
                InfoToast({message: 'User deleted successfully'});
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/updateuser', {
                email: edit[1],
                password: password
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 200) {
                setEdit([false, '']);
                setPassword('');
                InfoToast({message: 'User updated successfully'});
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const createUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/createuser', {
                email: newuser.email,
                password: newuser.password
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 200) {
                InfoToast({message: 'User created successfully'});
                fetchData();
                setCreate(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Sr no</div>
                        <div className="col col-2">User Email</div>
                        <div className="col col-3">Access Level</div>
                        <div className="col col-4" style={{ display: "flex", justifyContent: "end", marginRight: "10px" }}>Actions</div>
                    </li>
                    {Users.map((item, index) => {
                        return (
                            <li className="table-row" key={index} >
                                <div className="col col-1" data-label="Sr no">{index + 1}</div>
                                <div className="col col-2" data-label="User Email">{item.email}</div>
                                <div className="col col-3" data-label="Access Level">{item.role}</div>
                                <div className="col col-4" style={{ display: "flex", justifyContent: "end" }} data-label="Action">
                                    <FaEdit style={{ marginRight: "10px" }} className="btn_circle_normal" onClick={() => setEdit([true, item.email])} title='Edit User' />
                                    <FaTrash style={{ marginRight: "10px" }} className="btn_circle_normal" onClick={() => deleteUser(item.email)} title='Delete User' />
                                </div>
                            </li>
                        );
                    })

                    }
                </ul>
                {/* <button className="btn"
                    style={{cursor: "pointer", float: "right", borderRadius:"40px" }} ><i className="fa fa-plus"></i>
                </button> */}
                <FaPlus className="btn_circle_normal"
                    onClick={() => setCreate(true)}
                    style={{  border: "none", cursor: "pointer", float: "right", marginRight: "40px", fontSize: "40px" }} 
                    title='Create User'
                    >
                </FaPlus>
            </div>

            {
                edit[0] === true &&
                <div className="popup" style={{ display: "block", justifyContent: "center" }}>

                    <div>
                        <input type="text" value={edit[1]}>
                        </input>
                    </div>
                    <br />
                    <div>
                        <input type="text" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br />
                    <button style={{ width: "15%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 5px", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={updateUser} >Update</button>
                    <FaTimes className='btn_circle' style={{ float: "right", position: "none", right: "2%", top: "5%" }} onClick={() => setEdit([false, ''])} />
                </div>
            }
            {
                create === true &&
                <div className="popup" style={{ display: "block", justifyContent: "center" }}>
                    <div>
                        <input type="text" placeholder="Enter new Users email" value={newuser.email} onChange={(e) => setNewuser({email: e.target.value, password: newuser.password})} />
                    </div>
                    <br />
                    <div>
                        <input type="text" placeholder="Enter new password" value={newuser.password} onChange={(e) => setNewuser({email: newuser.email, password: e.target.value})} />
                    </div>
                    <br />
                    <button style={{ width: "15%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 5px", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={createUser} >Create</button>
                    <FaTimes className='btn_circle' style={{ float: "right", position: "none", right: "2%", top: "5%" }} onClick={() => setCreate(false)} />
                </div>
            }
        </>
    );
};

export default ManageUser;