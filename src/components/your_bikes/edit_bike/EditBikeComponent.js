import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";
import EditBikeForm from "./EditBikeForm";
import TransferBike from "./TransferBike";



class EditBikeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }
    handleChange = (index) => {
        this.setState({
            tabIndex: index
        });
    };

    render() {
        return (
            <div style={styles.wrapp}>
                <button style={styles.buttonTransfer} onClick={this.props.switchState}> <i className="fa fa-chevron-left"></i> GO BACK</button>
                <div className="row">
                    <div className="col-sm-7">
                        <EditBikeForm handleChange={this.handleChange} tabIndex={this.state.tabIndex} {...this.props} />
                    </div>
                    <div className="col-sm-5">
                        <TransferBike {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EditBikeComponent;
