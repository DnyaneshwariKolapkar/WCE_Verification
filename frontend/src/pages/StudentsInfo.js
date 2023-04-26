import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaTimes, FaPlus, FaUpload } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { InfoToast } from '../components/toaster';

const ManageStudents = () => {
    const [Students, setStudents] = useState([]);
    const [edit, setEdit] = useState([false, {
        prn: '',
        name: '',
        branch: '',
        passingYear: '',
        grade: [],
        finalGrade: '',
        qualification: '',
        fields: ["PRN", "CGPA"]
    }]);
    const [create, setCreate] = useState(false);
    const [newStudent, setNewStudent] = useState({
        prn: '',
        name: '',
        branch: '',
        passingYear: '',
        grade: [],
        finalGrade: '',
        qualification: '',
        fields: ["PRN", "CGPA"]
    });
    const [file, setFile] = useState([false, null]);

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/verification/admin/getstudentinfoall', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 200) {
                setStudents(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = async (prn) => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/deletestudentinfo', {
                prn: prn
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 200) {
                InfoToast({ message: 'Student deleted successfully' });
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/updatestudentinfo', {
                prn: edit[1].prn,
                name: edit[1].name,
                branch: edit[1].branch,
                passingYear: edit[1].passingYear,
                grade: edit[1].grade,
                finalGrade: edit[1].finalGrade,
                qualification: edit[1].qualification,
                fields: edit[1].fields
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 200) {
                InfoToast({ message: 'Student updated successfully' });
                fetchData();
                setEdit([false, '']);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const createStudent = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/insertstudentinfo', {
                name: newStudent.name,
                prn: newStudent.prn,
                branch: newStudent.branch,
                passingYear: newStudent.passingYear,
                grade: newStudent.grade,
                finalGrade: newStudent.finalGrade,
                qualification: newStudent.qualification,
                fields: newStudent.fields
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 201) {
                InfoToast({ message: 'Student created successfully' });
                fetchData();
                setNewStudent({
                    prn: '',
                    name: '',
                    branch: '',
                    passingYear: '',
                    grade: [],
                    finalGrade: '',
                    qualification: '',
                    fields: ["PRN", "CGPA"]
                });
                setCreate(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const insertFile = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file[1]);
            const response = await axios.post('http://localhost:5000/verification/admin/insertmultiplestudentinfo', formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                InfoToast({ message: 'Students created successfully' });
                fetchData();
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
                        <div className="col col-1" style={{ flexBasis: "30%" }}>PRN</div>
                        <div className="col col-2">Name</div>
                        <div className="col col-3">Branch</div>
                        <div className="col col-4">Passout Year</div>
                        <div className="col col-5" style={{ display: "flex", justifyContent: "end", marginRight: "10px" }}>Actions</div>
                    </li>
                    {Students.map((item, index) => {
                        return (
                            <li className="table-row" key={index} >
                                <div className="col col-1" data-label="PRN" style={{ flexBasis: "30%" }}>{item.prn}</div>
                                <div className="col col-2" data-label="Name">{item.name}</div>
                                <div className="col col-3" data-label="Branch">{item.branch}</div>
                                <div className="col col-4" data-label="Passout Year">{item.passingYear}</div>
                                <div className="col col-5" style={{ display: "flex", justifyContent: "end" }} data-label="Action">
                                    <FaEdit style={{ marginRight: "10px" }} className="btn_circle_normal" onClick={() => setEdit([true, { ...item }])} title='Edit User' />
                                    <FaTrash style={{ marginRight: "10px" }} className="btn_circle_normal" onClick={() => deleteUser(item.prn)} title='Delete User' />
                                </div>
                            </li>
                        );
                    })

                    }
                </ul>
                {/* <button className="btn"
                    style={{cursor: "pointer", float: "right", borderRadius:"40px" }} ><i className="fa fa-plus"></i>
                </button> */}
                {/* take only csv files */}

                <button className="btn" style={{ backgroundColor: "#222E3C", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", float: "right" }} onClick={() => setFile([true, ''])}>
                    Upload File
                </button>
                <FaPlus className="btn_circle_normal"
                    onClick={() => setCreate(true)}
                    style={{ border: "none", cursor: "pointer", float: "right", marginRight: "40px", fontSize: "40px", marginTop: "5px" }}
                    title='Create User'
                />
            </div>

            {
                file[0] === true &&
                <div div className="popup" style={{ display: "block", justifyContent: "center" }}>
                    <button>
                        <FaTimes className='btn_circle' style={{ top: "10px", left: "5px" }} onClick={() => setFile([false, ''])} />
                    </button>
                    <br />
                    <br />
                    <br />
                    <input type="file" onChange={(e) => setFile([true, e.target.files[0]])} accept=".csv, xlsx, .xls" id="file" name='file' style={{ marginLeft: "10px" }} />
                    <button className="btn"
                        style={{ backgroundColor: "#222E3C", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", float: "right", marginRight: "10px", marginBottom: "10px" }}
                        onClick={() => insertFile()}>
                        Submit
                    </button>
                </div>

            }

            {
                edit[0] === true &&

                <div div className="popup" style={{ display: "block", justifyContent: "center" }}>
                    <button>
                        <FaTimes className='btn_circle' style={{ top: "10px", left: "5px" }} onClick={() => setEdit([false, ''])} />
                    </button>
                    <br />
                    <br />
                    <br />
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <td>
                                        <input type="text" value={edit[1]?.name} onChange={(e) => setEdit([true, { ...edit[1], name: e.target.value }])}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ background: "#222E3C" }}>
                                        <select style={{ background: "#222E3C", color: "white", fontSize: "bold", boxSizing: "none" }} onChange={(e) => setEdit([true, { ...edit[1], fields: [e.target.value, edit[1]?.fields[1]] }])} value={edit[1]?.fields[0]}>
                                            <option value="PRN">PRN</option>
                                            <option value="Seat No">Seat No</option>
                                        </select>
                                    </th>
                                    <td>
                                        <input type="text" value={edit[1]?.prn} onChange={(e) => setEdit([true, { ...edit[1], prn: e.target.value }])}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Branch</th>
                                    <td>
                                        <input type="text" value={edit[1]?.branch} onChange={(e) => setEdit([true, { ...edit[1], branch: e.target.value }])}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ background: "#222E3C" }}>Passing Year</th>
                                    <td>
                                        <input type="text" value={edit[1]?.passingYear} onChange={(e) => setEdit([true, { ...edit[1], passingYear: e.target.value }])}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ background: "#222E3C" }}>Final Grade</th>
                                    <td>
                                        <input type="text" value={edit[1]?.finalGrade} onChange={(e) => setEdit([true, { ...edit[1], finalGrade: e.target.value }])}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ background: "#222E3C" }}>Qualification</th>
                                    <td>
                                        <input type="text" value={edit[1]?.qualification} onChange={(e) => setEdit([true, { ...edit[1], qualification: e.target.value }])}></input>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <br />
                        <br />
                        <br />
                        <br />
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>Sem-1</th>
                                    <th>Sem-2</th>
                                    <th>Sem-3</th>
                                    <th>Sem-4</th>
                                    <th>Sem-5</th>
                                    <th>Sem-6</th>
                                    <th>Sem-7</th>
                                    <th>Sem-8</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ backgroundColor: "#F8F8F8" }}>
                                    <td>
                                        <select onChange={(e) => setEdit([true, { ...edit[1], fields: [edit[1]?.fields[0], e.target.value] }])} value={edit[1]?.fields[1]}>
                                            <option value="CGPA">CGPA</option>
                                            <option value="Percentage">Percentage</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" value={edit[1]?.grade[0]} style={{ width: "30px" }} onChange={(e) => setEdit([true, { ...edit[1], grade: [e.target.value, edit[1]?.grade[1], edit[1]?.grade[2], edit[1]?.grade[3], edit[1]?.grade[4], edit[1]?.grade[5], edit[1]?.grade[6], edit[1]?.grade[7]] }])} />
                                    </td>
                                    <td>
                                        <input type="text" value={edit[1]?.grade[1]} style={{ width: "30px" }} onChange={(e) => setEdit([true, { ...edit[1], grade: [edit[1]?.grade[0], e.target.value, edit[1]?.grade[2], edit[1]?.grade[3], edit[1]?.grade[4], edit[1]?.grade[5], edit[1]?.grade[6], edit[1]?.grade[7]] }])} />
                                    </td>
                                    <td>
                                        <input type="text" value={edit[1]?.grade[2]} style={{ width: "30px" }} onChange={(e) => setEdit([true, { ...edit[1], grade: [edit[1]?.grade[0], edit[1]?.grade[1], e.target.value, edit[1]?.grade[3], edit[1]?.grade[4], edit[1]?.grade[5], edit[1]?.grade[6], edit[1]?.grade[7]] }])} />
                                    </td>
                                    <td>
                                        <input type="text" value={edit[1]?.grade[3]} style={{ width: "30px" }} onChange={(e) => setEdit([true, { ...edit[1], grade: [edit[1]?.grade[0], edit[1]?.grade[1], edit[1]?.grade[2], e.target.value, edit[1]?.grade[4], edit[1]?.grade[5], edit[1]?.grade[6], edit[1]?.grade[7]] }])} />
                                    </td>
                                    <td>
                                        <input type="text" value={edit[1]?.grade[4]} style={{ width: "30px" }} onChange={(e) => setEdit([true, { ...edit[1], grade: [edit[1]?.grade[0], edit[1]?.grade[1], edit[1]?.grade[2], edit[1]?.grade[3], e.target.value, edit[1]?.grade[5], edit[1]?.grade[6], edit[1]?.grade[7]] }])} />
                                    </td>
                                    <td>
                                        <input type="text" value={edit[1]?.grade[5]} style={{ width: "30px" }} onChange={(e) => setEdit([true, { ...edit[1], grade: [edit[1]?.grade[0], edit[1]?.grade[1], edit[1]?.grade[2], edit[1]?.grade[3], edit[1]?.grade[4], e.target.value, edit[1]?.grade[6], edit[1]?.grade[7]] }])} />
                                    </td>
                                    <td>
                                        <input type="text" value={edit[1]?.grade[6]} style={{ width: "30px" }} onChange={(e) => setEdit([true, { ...edit[1], grade: [edit[1]?.grade[0], edit[1]?.grade[1], edit[1]?.grade[2], edit[1]?.grade[3], edit[1]?.grade[4], edit[1]?.grade[5], e.target.value, edit[1]?.grade[7]] }])} />
                                    </td>
                                    <td>
                                        <input type="text" value={edit[1]?.grade[7]} style={{ width: "30px" }} onChange={(e) => setEdit([true, { ...edit[1], grade: [edit[1]?.grade[0], edit[1]?.grade[1], edit[1]?.grade[2], edit[1]?.grade[3], edit[1]?.grade[4], edit[1]?.grade[5], edit[1]?.grade[6], e.target.value] }])} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <button style={{ width: "25%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 10px", border: "none", borderRadius: "5px", cursor: "pointer", float: "right" }} onClick={() => updateUser()}>Update</button>
                </div>
            }
            {
                create === true &&

                <div div className="popup" style={{ display: "block", justifyContent: "center" }}>
                    <button>
                        <FaTimes className='btn_circle' style={{ top: "10px", left: "5px" }} onClick={() => setCreate(false)} />
                    </button>
                    <br />
                    <br />
                    <br />
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <td>
                                        <input type="text" value={newStudent?.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ background: "#222E3C" }}>
                                        <select style={{ background: "#222E3C", color: "white", fontSize: "bold", boxSizing: "none" }} onChange={(e) => setNewStudent({ ...newStudent, fields: [e.target.value, newStudent?.fields[1]] })} value={newStudent?.fields[0]}>
                                            <option value="PRN">PRN</option>
                                            <option value="Seat No">Seat No</option>
                                        </select>
                                    </th>
                                    <td>
                                        <input type="text" value={newStudent?.prn} onChange={(e) => setNewStudent({ ...newStudent, prn: e.target.value })}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Branch</th>
                                    <td>
                                        <input type="text" value={newStudent?.branch} onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ background: "#222E3C" }}>Passing Year</th>
                                    <td>
                                        <input type="text" value={newStudent?.passingYear} onChange={(e) => setNewStudent({ ...newStudent, passingYear: e.target.value })}></input>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <br />
                        <br />
                        <br />
                        <br />
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>Sem-1</th>
                                    <th>Sem-2</th>
                                    <th>Sem-3</th>
                                    <th>Sem-4</th>
                                    <th>Sem-5</th>
                                    <th>Sem-6</th>
                                    <th>Sem-7</th>
                                    <th>Sem-8</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ backgroundColor: "#F8F8F8" }}>
                                    <td>
                                        <select onClick={(e) => setNewStudent({...newStudent, fields: [newStudent?.fields[0], e.target.value]})} value={newStudent?.fields[1]} >
                                            <option value="CGPA">CGPA</option>
                                            <option value="Percentage">Percentage</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" value={newStudent?.grade[0]} style={{ width: "30px" }} onChange={(e) => setNewStudent({ ...newStudent, grade: [e.target.value, newStudent?.grade[1], newStudent?.grade[2], newStudent?.grade[3], newStudent?.grade[4], newStudent?.grade[5], newStudent?.grade[6], newStudent?.grade[7]] })} />
                                    </td>
                                    <td>
                                        <input type="text" value={newStudent?.grade[1]} style={{ width: "30px" }} onChange={(e) => setNewStudent({ ...newStudent, grade: [newStudent?.grade[0], e.target.value, newStudent?.grade[2], newStudent?.grade[3], newStudent?.grade[4], newStudent?.grade[5], newStudent?.grade[6], newStudent?.grade[7]] })} />
                                    </td>
                                    <td>
                                        <input type="text" value={newStudent?.grade[2]} style={{ width: "30px" }} onChange={(e) => setNewStudent({ ...newStudent, grade: [newStudent?.grade[0], newStudent?.grade[1], e.target.value, newStudent?.grade[3], newStudent?.grade[4], newStudent?.grade[5], newStudent?.grade[6], newStudent?.grade[7]] })} />
                                    </td>
                                    <td>
                                        <input type="text" value={newStudent?.grade[3]} style={{ width: "30px" }} onChange={(e) => setNewStudent({ ...newStudent, grade: [newStudent?.grade[0], newStudent?.grade[1], newStudent?.grade[2], e.target.value, newStudent?.grade[4], newStudent?.grade[5], newStudent?.grade[6], newStudent?.grade[7]] })} />
                                    </td>
                                    <td>
                                        <input type="text" value={newStudent?.grade[4]} style={{ width: "30px" }} onChange={(e) => setNewStudent({ ...newStudent, grade: [newStudent?.grade[0], newStudent?.grade[1], newStudent?.grade[2], newStudent?.grade[3], e.target.value, newStudent?.grade[5], newStudent?.grade[6], newStudent?.grade[7]] })} />
                                    </td>
                                    <td>
                                        <input type="text" value={newStudent?.grade[5]} style={{ width: "30px" }} onChange={(e) => setNewStudent({ ...newStudent, grade: [newStudent?.grade[0], newStudent?.grade[1], newStudent?.grade[2], newStudent?.grade[3], newStudent?.grade[4], e.target.value, newStudent?.grade[6], newStudent?.grade[7]] })} />
                                    </td>
                                    <td>
                                        <input type="text" value={newStudent?.grade[6]} style={{ width: "30px" }} onChange={(e) => setNewStudent({ ...newStudent, grade: [newStudent?.grade[0], newStudent?.grade[1], newStudent?.grade[2], newStudent?.grade[3], newStudent?.grade[4], newStudent?.grade[5], e.target.value, newStudent?.grade[7]] })} />
                                    </td>
                                    <td>
                                        <input type="text" value={newStudent?.grade[7]} style={{ width: "30px" }} onChange={(e) => setNewStudent({ ...newStudent, grade: [newStudent?.grade[0], newStudent?.grade[1], newStudent?.grade[2], newStudent?.grade[3], newStudent?.grade[4], newStudent?.grade[5], newStudent?.grade[6], e.target.value] })} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <button style={{ width: "25%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 10px", border: "none", borderRadius: "5px", cursor: "pointer", float: "right" }} onClick={() => createStudent()}> Add Student </button>
                </div>
            }

        </>
    );
};

export default ManageStudents;