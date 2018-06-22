import React, { Component } from "react";
import styles from "./YourAccountComponentStyle";
import YourAccountForm from "./YourAccountForm";
import YourAccountInfo from "./YourAccountInfo";

class YourAccountComponent extends Component {

    render() {
        return (
            <div style={styles.wrapp}>
                <div className="row">
                    <div className="col-sm-4">
                        <YourAccountInfo {...this.props}/>
                    </div>
                    <div className="col-sm-6">
                        <YourAccountForm {...this.props}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default YourAccountComponent;
