import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import DocViewer from "@cyntler/react-doc-viewer";
import {
    FaSearch
} from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import { SuccessToast, ErrorToast, WarningToast, InfoToast } from '../components/toaster';


const DocView = () => {
    const [prn, setPrn] = React.useState("");
    const [show, setShow] = React.useState([false, ""]);
    const [student, setStudent] = React.useState({});
    const user = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();
    const id = location?.state?.id;
    const documents = location?.state?.documents;
    var docs = [];
    for (let i = 0; i < documents.length; i++) {
        docs.push({ uri: `http://localhost:5000/document/${documents[i]}` })
    }

    const searchButton = async () => {
        try {
            if (prn) {
                const response = await axios.post('http://localhost:5000/verification/admin/getstudentinfo',
                    { prn: prn },
                    {
                        headers: {
                            "Authorization": `Bearer ${user.token}`
                        }
                    }
                );
                if (response.status === 200) {
                    SuccessToast({ message: response.data.message, isNavigation: false });
                    setStudent(response.data.data);
                    setShow([true, "Update"]);
                }
                else {
                    ErrorToast({ message: response.data.message });
                }

            }
            else {
                WarningToast({ message: "Please enter PRN" });
            }

        } catch (error) {
            console.log(error.response.data.message);
            ErrorToast({ message: error.response.data.message });
            setStudent({
                prn: "",
                name: "",
                branch: "",
                passingYear: "",
                grade: [0, 0, 0, 0, 0, 0, 0, 0]
            });
            setShow([true, "Insert"]);
        }
    }

    const createStudent = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/insertstudentinfo', {
                name: student.name,
                prn: student.prn,
                branch: student.branch,
                passingYear: student.passingYear,
                grade: student.grade
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 201) {
                InfoToast({ message: 'Student created successfully' });
                setStudent({
                    prn: "",
                    name: "",
                    branch: "",
                    passingYear: "",
                    grade: [0, 0, 0, 0, 0, 0, 0, 0]
                });
                setShow([false, ""]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const verifyButton = async (status) => {
        try {
            if (prn) {
                const response = await axios.post(`http://localhost:5000/verification/admin/verifystudent/${status}`,
                    {
                        id: id,
                        prn: student.prn,
                        name: student.name,
                        branch: student.branch,
                        passingYear: student.passingYear
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );
                if (response.status === 200) {
                    InfoToast({ message: `Student ${status}` });
                }
                else {
                    ErrorToast({ message: response.data.message });
                }

            }

        } catch (error) {
            ErrorToast({ message: error.response.data.message });
        }
    }

    const updateButton = async () => {
        try {
            if (prn) {
                const response = await axios.post(`http://localhost:5000/verification/admin/updatestudentinfo`,
                    student,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );
                if (response.status === 200) {
                    SuccessToast({ message: response.data.message, isNavigation: false });
                    setShow([false, ""]);
                }
            }

        } catch (error) {
            if (error.response.status === 404) {
                ErrorToast({ message: error.response.data.message });
            }
            else {
                ErrorToast({ message: error.response.data.message });
            }
        }
    }


    return (
        <>
            <ToastContainer />
            <div className='doc-container'>
                <div className="container" >
                    <div className="row">
                        <div className="col-12">
                            <DocViewer
                                documents={docs}
                                config={{
                                    header: {
                                        disableFileName: true,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div>
                        <input type="text"
                            style={{ width: "90%", borderSize: "1px solid #ccc", borderRadius: "0px", padding: "8px 15px", margin: "8px 0", boxSizing: "border-box" }}
                            className='searchtext'
                            placeholder="Enter PRN"
                            value={prn}
                            onChange={(e) => setPrn(e.target.value)} />
                        <button className='searchButton' onClick={searchButton}>
                            <FaSearch />
                        </button>
                        <br />
                        <br />
                    </div>
                    {
                        show[0] ?
                            <>
                                {
                                    show[1] === "Insert" ?
                                    <button style={{ width: "25%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 10px", border: "none", borderRadius: "5px", cursor: "pointer", float: "right" }} onClick={createStudent}>{show[1]}</button>
                                    :
                                    <button style={{ width: "25%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 10px", border: "none", borderRadius: "5px", cursor: "pointer", float: "right" }} onClick={updateButton}>{show[1]}</button>
                                }
                                <br />
                                <br />
                                <br />
                                <div className="table-wrapper">
                                    <table className="fl-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <td>
                                                    <input type="text" value={student?.name} onChange={(e) => setStudent({ ...student, name: e.target.value })}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style={{ background: "#222E3C" }}>
                                                    <select style={{ background: "#222E3C" , color:"white",fontSize:"bold", boxSizing:"none"}}>
                                                        <option value="">PRN</option>
                                                        <option value="">Seat no</option>
                                                    </select>
                                                </th>
                                                <td>
                                                    <input type="text" value={student?.prn} onChange={(e) => setStudent({ ...student, prn: e.target.value })}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Branch</th>
                                                <td>
                                                    <input type="text" value={student?.branch} onChange={(e) => setStudent({ ...student, branch: e.target.value })}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style={{ background: "#222E3C" }}>Passing Year</th>
                                                <td>
                                                    <input type="text" value={student?.passingYear} onChange={(e) => setStudent({ ...student, passingYear: e.target.value })}></input>
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
                                                    <select>
                                                        <option value="">CGPA</option>
                                                        <option value="">% Marks</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[0]} style={{ width: "35px" }} onChange={(e) => setStudent({ ...student, grade: [e.target.value, student?.grade[1], student?.grade[2], student?.grade[3], student?.grade[4], student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[1]} style={{ width: "35px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], e.target.value, student?.grade[2], student?.grade[3], student?.grade[4], student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[2]} style={{ width: "35px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], e.target.value, student?.grade[3], student?.grade[4], student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[3]} style={{ width: "35px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], e.target.value, student?.grade[4], student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[4]} style={{ width: "35px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], student?.grade[3], e.target.value, student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[5]} style={{ width: "35px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], student?.grade[3], student?.grade[4], e.target.value, student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[6]} style={{ width: "35px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], student?.grade[3], student?.grade[4], student?.grade[5], e.target.value, student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[7]} style={{ width: "35px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], student?.grade[3], student?.grade[4], student?.grade[5], student?.grade[6], e.target.value] })} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                                <br />
                                <button style={{ width: "30%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => verifyButton("approved")}>Verify</button>
                                <button style={{ width: "30%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => verifyButton("rejected")}>Reject</button>
                                <button style={{ width: "30%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "150px 10px", border: "none", borderRadius: "5px", cursor: "pointer", float: "right" }} >View certificate</button>
                            </>
                            : null
                    }
                </div>
            </div>
        </>
    )
}

export default DocView