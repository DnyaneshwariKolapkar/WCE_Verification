import React, { useState } from 'react';
import {
    FaList,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaRupeeSign,
    FaHistory,
    FaSignOutAlt,
    FaArrowLeft,
    FaUserGraduate
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

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
            path: "studentsinfo",
            name: "Students",
            icon: <FaUserGraduate />
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
            path: "/login",
            name: "Logout",
            icon: <FaSignOutAlt />
        }
    ]

    if (user && user.role === "admin") {
        const temp = menuItem[5];
        menuItem[5] = { path: "manageuser", name: "Manage User", icon: <FaUserAlt /> };
        menuItem.push(temp);
    }

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
                            {...item.name === "Logout" ? { onClick: () => localStorage.removeItem('user') } : null}
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