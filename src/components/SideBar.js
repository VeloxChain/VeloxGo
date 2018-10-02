import React, { Component } from "react";
import NavLink from "../components/NavLink";

class SideBar extends Component{
    render() {
        return (
            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                <div className="menu_section">
                    <ul className="nav side-menu">
                        <NavLink to="/">
                            <span className="icon-bike">YOUR VEHICLES</span>
                        </NavLink>
                        <NavLink to="/hiring_request">
                            <span className="icon-money">FIND VEHICLE</span>
                        </NavLink>
                        <NavLink to="/your_account">
                            <span className="icon-price-tag">YOUR ACCOUNT</span>
                        </NavLink>
                        <NavLink to="/logs">
                            <span className="icon-smartphone">LOGS</span>
                        </NavLink>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideBar;
