import React, { Component } from "react";

class Logo extends Component {

    render() {
        return (
            <div className="flexible">
                <div className="logo-menu italic underline-none">
                    <img src="/images/VeloxGo_logo.png" alt="VeloxGo" />
                </div>
                <a className="pointer toggleMenu hidden-md hidden-lg close-menu">
                    <img src="images/close_white.png" alt="closeMenu" />
                </a>
            </div>
        );
    }
}

export default Logo;
