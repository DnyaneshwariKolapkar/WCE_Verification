import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaRemoveFormat } from 'react-icons/fa';

const ManageUser = () => {

    return (
        <>
            <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Sr no</div>
                        <div className="col col-2">User Email</div>
                        <div className="col col-3">Action</div>
                    </li>
                    <li className='table-row'>
                    <div className="col col-1" data-label="Sr no">1</div>
                    <div className="col col-2" data-label="Company Email">vvk@gmail.com</div>
                    <button className="btn"><i className="fa fa-edit"></i></button>
                    <button className="btn"><i className="fa fa-close"></i></button>
                    </li>
                </ul>
                <button className="btn"
                    style={{cursor: "pointer", float: "right", borderRadius:"40px" }} ><i className="fa fa-plus"></i>
                </button>
            </div>

        </>
    );
};

export default ManageUser;