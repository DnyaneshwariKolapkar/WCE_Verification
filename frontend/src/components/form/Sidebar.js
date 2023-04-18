import React, { useState } from 'react';
import {
    FaList,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaRupeeSign,
    FaHistory,
    FaSignOutAlt,
    FaArrowLeft    
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }
    const menuItem = [
        {
            path: "pendingreq",
            name: "Requests",
            icon: <FaList />
        },
        {
            path: "allreq",
            name: "History",
            icon: <FaHistory />
        },
        {
            path: "analytics",
            name: "Report",
            icon: <FaRegChartBar />
        },
        {
            path: "transactions",
            name: "Transactions",
            icon: <FaRupeeSign />
        },
        {
            path: "manageuser",
            name: "Manage Users",
            icon: <FaUserAlt />
        },
        {
            path: "/login",
            name: "Logout",
            icon: <FaSignOutAlt />
        }
    ]
    return (
        <div className="container-sidebar">
            <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Menu</h1>
                    <div style={{ marginLeft: isOpen ? "80px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link"
                            {...item.name === "Logout" ? { onClick: () => localStorage.removeItem('token') } : {}}
                        >
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>
                <Outlet />
            </main>
            <button>
                <FaArrowLeft className='btn_circle' 
                style={{left: isOpen ? "270px" : "100px"}}
                onClick={handleGoBack} />
            </button>
        </div>
    );
};

export default Sidebar;