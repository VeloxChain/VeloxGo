import React, { Component } from "react";
import Logo from "./Logo";
import SideBar from "./SideBar";
import styles from "./your_bikes/YourBikesComponentStyle";
import { collectToken } from "../actions/accountActions";
class Header extends Component {
    constructor(props) {
        super(props);
    }
    collectBikeToken = () => {
        let { userProfile } = this.props;
        let data = {
            address: userProfile.data.accountAddress,
            ethereum: this.props.ethereum,
        };
        this.props.dispatch(collectToken(data));
    }
    render() {
        return (
            <div className="absolute-w230 menuBar openMenu">
                <div className="col-md-12">
                    <div className="row">
                        <div className="left_col scroll-view vh100">
                            <Logo/>
                            {this.props.hidden ? "" : (<SideBar/>)}
                            {this.props.hidden ? "" : (
                                <div style={styles.getBikeCoin}>
                                    <button style={styles.buttonGetBikeCoin} onClick={this.collectBikeToken}>Get Free 200 Bikecoin</button>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
