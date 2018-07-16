import React, { Component } from "react";
import Logo from "./Logo";
import SideBar from "./SideBar";
import styles from "./your_bikes/YourBikesComponentStyle";

class Header extends Component {
    render() {
        return (
            <div className="absolute-w230 menuBar openMenu">
                <div className="col-md-12">
                    <div className="row">
                        <div className="left_col scroll-view vh100">
                            <Logo/>
                            {this.props.hidden ? "" : (<SideBar/>)}
                            <div style={styles.getBikeCoin}>
                                <button style={styles.buttonGetBikeCoin}>Get Bikecoin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
