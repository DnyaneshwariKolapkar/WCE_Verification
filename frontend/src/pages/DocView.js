import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import DocViewer from "@cyntler/react-doc-viewer";
import {
    FaSearch
} from "react-icons/fa";


const DocView = () => {
    const [prn, setPrn] = React.useState("");
    const [show, setShow] = React.useState(false);
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
                    setStudent(response.data.data);
                    setShow(true);
                    alert("Student found");
                }
                else {
                    alert("Student not found");
                }

            }
            else {
                alert("Please enter PRN");
            }

        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
    }
    useEffect(() => {
    })

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
                    alert(`Student ${status}`);
                }
                else {
                    alert("student not found");
                }

            }

        } catch (error) {
            console.log(error);
            alert("something went wrong");
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
                    alert(`Student updated`);
                }
            }

        } catch (error) {
            if (error.response.status === 404) {
                alert("PRN is fixed and cannot be changed");
            }
            else {
                console.log(error);
                alert("something went wrong");
            }
        }
    }


    return (
        <>
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
                        show ?
                            <>
                                <button style={{ width: "25%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 10px", border: "none", borderRadius: "5px", cursor: "pointer", float: "right" }} onClick={updateButton}>Update</button>
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
                                                <th style={{ background: "#222E3C" }}>PRN</th>
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
                                                <th>Passing Year</th>
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
                                                <td>CGPA</td>
                                                <td>
                                                    <input type="text" value={student?.grade[0]} style={{ width: "30px" }} onChange={(e) => setStudent({ ...student, grade: [e.target.value, student?.grade[1], student?.grade[2], student?.grade[3], student?.grade[4], student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[1]} style={{ width: "30px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], e.target.value, student?.grade[2], student?.grade[3], student?.grade[4], student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[2]} style={{ width: "30px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], e.target.value, student?.grade[3], student?.grade[4], student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[3]} style={{ width: "30px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], e.target.value, student?.grade[4], student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[4]} style={{ width: "30px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], student?.grade[3], e.target.value, student?.grade[5], student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[5]} style={{ width: "30px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], student?.grade[3], student?.grade[4], e.target.value, student?.grade[6], student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[6]} style={{ width: "30px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], student?.grade[3], student?.grade[4], student?.grade[5], e.target.value, student?.grade[7]] })} />
                                                </td>
                                                <td>
                                                    <input type="text" value={student?.grade[7]} style={{ width: "30px" }} onChange={(e) => setStudent({ ...student, grade: [student?.grade[0], student?.grade[1], student?.grade[2], student?.grade[3], student?.grade[4], student?.grade[5], student?.grade[6], e.target.value] })} />
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
                                <br />
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