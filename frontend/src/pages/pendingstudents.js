import React from 'react';
import { useState, useEffect } from 'react';
import DocViewer from "@cyntler/react-doc-viewer";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const Pendingstudents = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const unqId = location?.state?.unqId;
    const [popup, Setpopup] = useState(false);

    const [data, setData] = useState([]);
    useEffect(() => {
        const requestData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/verification/admin/getstudents', {
                    unqId: unqId,
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.status === 200) {
                    setData(response.data.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        requestData()
    }, [unqId])

    const viewButton = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verification/admin/getpdf', {
                unqId: unqId,
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                Setpopup(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const reload = async () => {
            try {
                const response = await axios.post('http://localhost:5000/verification/admin/getpdf', {
                    unqId: unqId,
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
            }
            catch (error) {
                console.log(error)
            }
        }
        reload();
    })



    return (
        <>
            <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Sr no</div>
                        <div className="col col-2">Student Name</div>
                        <div className="col col-3">Status</div>
                    </li>
                    {data.map((item, index) => {
                        return (
                            <li className="table-row" onClick={() => navigate('view', { state: { documents: data[index].documents, id: data[index]._id } })} key={index}>
                                <div className="col col-1" data-label="Sr no">{index + 1}</div>
                                <div className="col col-2" data-label="Student Name">{item.name}</div>
                                {item.status === 'pending' ? <div className="col col-3" data-label="Status" style={{ color: 'yellow' }}>{item.status}</div> : null}
                                {item.status === 'approved' ? <div className="col col-3" data-label="Status" style={{ color: 'green' }}>{item.status}</div> : null}
                                {item.status === 'rejected' ? <div className="col col-3" data-label="Status" style={{ color: 'red' }}>{item.status}</div> : null}
                            </li>
                        )
                    })}

                </ul>
                <button className="viewButton"
                    onClick={viewButton}
                    style={{ width: "25%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 5px", border: "none", borderRadius: "5px", cursor: "pointer", float: "right" }} >
                    View certificate
                </button>
                {
                    popup === true &&
                    <div className="popup">
                        <button>
                            <FaTimes className='btn_circle' onClick={() => Setpopup(false)} />
                        </button>
                        <DocViewer
                            documents={[
                                {
                                    uri: `http://localhost:5000/certificate/${unqId}.pdf`
                                },
                            ]}
                            config={{
                                header: {
                                    disableFileName: true,
                                }
                            }}

                        />
                        {/* <button onClick={() => Setpopup(false)}>close</button> */}
                        <button style={{float:"right", width: "15%", backgroundColor: "#222E3C", color: "white", padding: "10px 15px", margin: "9px 5px", border: "none", borderRadius: "5px", cursor: "pointer"}}>send</button>
                    </div>
                }
            </div>
        </>
    );
};

export default Pendingstudents;