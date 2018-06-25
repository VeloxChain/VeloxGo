import React, { Component } from "react";
import { MODAL_REGISTER_BIKE } from "../modal/constants";
import Datatable from "../datatable/Datatable";
import styles from "./YourBikesComponentStyle";
import EditBikeComponent from "./edit_bike/EditBikeComponent";
class YourBikesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params : [
                {title: "BIKE(jSerial number)", value: "snNumber"},
                {title: "MANUFACTURER", value: "manufacturer"},
                {title: "YEAR", value: "year"},
                {title: "STATUS", value: "status"},
                {title: "FORRENT", value: "forRent"},
                {title: "ACTION", value: "action"}
            ],
            actions: [
                {name: "Edit", handle: this.editRow}
            ],
            isEdit: false,
            rowEdit: {},
            rowIndex: ""
        };
    }

    switchState = () => {
        this.setState((prevState) => {
            return {
                isEdit : !prevState.isEdit
            };
        });
    }
    editRow = (row, index) => {
        this.setState({
            rowEdit: row,
            rowIndex: index,
        }, () => this.switchState());
    }
    _renderView = () => {
        if (this.state.isEdit) {
            return (
                <EditBikeComponent {...this.props} switchState={this.switchState} bikeInfo={this.state.rowEdit} index={this.state.rowIndex} />
            );
        }
        return (
            <div style={styles.wrapp}>
                <div className="text-right">
                    <button style={styles.button} onClick={() => this.props.setType(MODAL_REGISTER_BIKE)}>New Bike</button>
                </div>
                <Datatable params={this.state.params} body={this.props.bikes} editRow={this.editRow} actions={this.state.actions} />
            </div>
        );
    }


    render() {
        return (
            <div>
                {this._renderView()}
            </div>
        );
    }
}

export default YourBikesComponent;
