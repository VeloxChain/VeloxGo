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
                {title: "MANUFACTURER", value: "manufaturer"},
                {title: "YEAR", value: "year"},
                {title: "STATUS", value: "status"},
                {title: "ACTION", value: "action"},
            ],
            body: [
                {snNumber: "2018-BKC-ZbX75728iFp5", manufaturer: "Volata Cycles", year: 2018, status: "ACTIVE"},
                {snNumber: "2018-BKC-2pG28Xu5hWn2", manufaturer: "Volata Cycles", year: 2018, status: "INACTIVE"},
                {snNumber: "2018-BKC-NdR77Bh6qB99", manufaturer: "Volata Cycles", year: 2018, status: "ACTIVE"},
                {snNumber: "2018-BKC-YyS27Yk6h2j3", manufaturer: "Volata Cycles", year: 2018, status: "INACTIVE"},
                {snNumber: "2018-BKC-EkU28Xr9c9v3", manufaturer: "Volata Cycles", year: 2018, status: "ACTIVE"},
                {snNumber: "2018-BKC-G4U52Nc6w6m9", manufaturer: "Volata Cycles", year: 2018, status: "INACTIVE"},
            ],
            actions: [
                {name: "Edit", handle: this.editRow}
            ],
            isEdit: false,
            rowEdit: {}
        };
    }

    switchState = () => {
        this.setState((prevState) => {
            return {
                isEdit : !prevState.isEdit
            };
        });
    }
    editRow = (row) => {
        this.setState({
            rowEdit: row
        }, () => this.switchState());
    }
    _renderView = () => {
        if (this.state.isEdit) {
            return (
                <EditBikeComponent {...this.props} switchState={this.switchState} data={this.state.rowEdit} />
            );
        }
        return (
            <div style={styles.wrapp}>
                <div className="text-right">
                    <button style={styles.button} onClick={() => this.props.setType(MODAL_REGISTER_BIKE)}>New Bike</button>
                </div>
                <Datatable params={this.state.params} body={this.state.body} editRow={this.editRow} actions={this.state.actions} />
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
