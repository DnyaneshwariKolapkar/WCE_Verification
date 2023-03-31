import React, { useState } from 'react';
import {
    FaList,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaRupeeSign,
    FaHistory
}from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';


const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"pendingreq",
            name:"Requests",
            icon:<FaList/>
        },
        {
            path:"allreq",
            name:"History",
            icon:<FaHistory/>
        },
        {
            path:"analytics",
            name:"Report",
            icon:<FaRegChartBar/>
        },
        {
            path:"transactions",
            name:"Transactions",
            icon:<FaRupeeSign/>
        },
        {
            path:"manageuser",
            name:"Manage Users",
            icon:<FaUserAlt/>
        },
    ]
    return (
        <div className="container-sidebar">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Menu</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>
            <Outlet/>
           </main>
        </div>
    );
};

export default Sidebar;