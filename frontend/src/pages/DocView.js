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

    const searchButton = async () => {
        try {
            if (prn) {
                const response = await axios.post('http://localhost:5000/verification/admin/getstudentinfo',
                    { prn: prn },
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
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



    const location = useLocation();
    const documents = location?.state?.documents;
    var docs = [];
    for (let i = 0; i < documents.length; i++) {
        docs.push({ uri: `http://localhost:5000/document/${documents[i]}` })
    }

    return (
        <>
            <div className='doc-container'>
                <div className="container" style={{ display: "inline-flex" }}>
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
                        {/* <label className='label-prn'>Enter PRN</label> */}
                        <input type="text"
                        style={{width:"90%", borderSize:"1px solid #ccc", borderRadius:"0px", padding:"8px 15px", margin:"8px 0", boxSizing:"border-box"}}
                            className='searchtext'
                            placeholder="Enter PRN"
                            value={prn}
                            onChange={(e) => setPrn(e.target.value)} />
                        <button className='searchButton'  onClick={searchButton}>
                            <FaSearch />
                        </button>
                        <br />
                        <br />
                    </div>
                    {
                        show ?
                            <div className="table-wrapper">
                                <table className="fl-table">
                                    {/* <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>PRN</th>
                                            <th>Passing Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ backgroundColor: "#F8F8F8" }}>
                                            <td>{student?.name}</td>
                                            <td>{student?.prn}</td>
                                            <td>{student?.passingYear}</td>
                                        </tr>
                                    </tbody> */}
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <td>{student?.name}</td>
                                        </tr>
                                        <tr>
                                            <th style={{background:"#222E3C"}}>PRN</th>
                                            <td>{student?.prn}</td>
                                        </tr>
                                        <tr>
                                            <th>Passing Year</th>
                                            <td>{student?.passingYear}</td>
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
                                            <td>{student?.grade[0]}</td>
                                            <td>{student?.grade[1]}</td>
                                            <td>{student?.grade[2]}</td>
                                            <td>{student?.grade[3]}</td>
                                            <td>{student?.grade[4]}</td>
                                            <td>{student?.grade[5]}</td>
                                            <td>{student?.grade[6]}</td>
                                            <td>{student?.grade[7]}</td>
                                        </tr>
                                    </tbody>
                                    {/* <thead>
                                        <tr>
                                            <th>Semester</th>
                                            <td>CGPA</td>
                                        </tr>
                                        <tr>
                                            <th style={{background:"#222E3C"}}>Sem-1</th>
                                            <td>{student?.grade[0]}</td>
                                        </tr>
                                        <tr>
                                            <th>Sem-2</th>
                                            <td>{student?.grade[1]}</td>
                                        </tr>
                                        <tr>
                                            <th style={{background:"#222E3C"}}>Sem-3</th>
                                            <td>{student?.grade[2]}</td>
                                        </tr>
                                        <tr>
                                            <th>Sem-4</th>
                                            <td>{student?.grade[3]}</td>
                                        </tr>
                                        <tr>
                                            <th style={{background:"#222E3C"}}>Sem-5</th>
                                            <td>{student?.grade[4]}</td>
                                        </tr>
                                        <tr>
                                            <th>Sem-6</th>
                                            <td>{student?.grade[5]}</td>
                                        </tr>
                                        <tr>
                                            <th style={{background:"#222E3C"}}>Sem-7</th>
                                            <td>{student?.grade[6]}</td>
                                        </tr>
                                        <tr>
                                            <th>Sem-8</th>
                                            <td>{student?.grade[7]}</td>
                                        </tr>
                                    </thead> */}
                                </table>
                                <br />
                                <br />
                                <br />
                            <button style={{width:"20%", backgroundColor:"#222E3C", color:"white", padding:"10px 15px", margin:"9px 10px", border:"none", borderRadius:"5px", cursor:"pointer"}} >Verified</button>
                            </div>
                            : null
                    }
                </div>
            </div>
        </>
    )
}

export default DocView