import React, { Component } from "react";
import NavLink from "../components/NavLink";

class SideBar extends Component{
    render() {
        return (
            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                <div className="menu_section">
                    <ul className="nav side-menu">
                        <NavLink to="/">
                            <img src="images/XMLID_3.png" className="mgr-15" alt="Bikecoin" />
                            <span>YOUR BIKES</span>
                        </NavLink>
                        <NavLink to="/hiring_request">
                            <img src="images/XMLID_1.png" className="mgr-15" alt="Bikecoin" />
                            <span>RENT BIKE</span>
                        </NavLink>
                        <NavLink to="/your_account">
                            <img src="images/XMLID_2.png" className="mgr-15" alt="Bikecoin" />
                            <span>YOUR ACCOUNT</span>
                        </NavLink>
                        <NavLink to="/logs">
                            <img src="images/logs.png" className="mgr-15" alt="Logs" />
                            <span>LOGS</span>
                        </NavLink>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideBar;
