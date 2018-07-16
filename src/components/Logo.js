import React, { Component } from "react";

class Logo extends Component {

    render() {
        return (
            <div className="flexible">
                <div className="logo-menu italic underline-none">
                    <img src="/images/logo-full.png" alt="Bikecoin" />
                </div>
                <a className="pointer toggleMenu hidden-md hidden-lg close-menu">
                    <i className="fa fa-times"></i>
                </a>
            </div>
        );
    }
}

export default Logo;
