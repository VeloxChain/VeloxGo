import React, { Component } from "react";
import { MODAL_REGISTER_BIKE } from "../modal/constants";
import Datatable from "../datatable/Datatable";
import styles from "./YourBikesComponentStyle";
import EditBikeComponent from "./edit_bike/EditBikeComponent";
import Toggle from "material-ui/Toggle";
import { updateBike } from "../../actions/bikeActions";
import SERVICE_IPFS from "../../services/ipfs";
class YourBikesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params : [
                {title: "BIKE(jSerial number)", value: "snNumber"},
                {title: "MANUFACTURER", value: "manufacturer"},
                {title: "YEAR", value: "year"},
                {title: "STATUS", value: "status"},
                {title: "FOR RENT", value: "toggle", name: "forrent"},
                {title: "ACTION", value: "action"}
            ],
            actions: [
                {name: "Edit", handle: this.editRow}
            ],
            toggle: {
                "forrent":  this._renderToggle
            },
            isEdit: false,
            rowEdit: {},
            rowIndex: ""
        };
    }

    changeBikeInfo = async (isInputChecked, rowEdit,rowIndex) => {
        let dataChanges = Object.assign(rowEdit, {forRent: isInputChecked});
        await this.setState({ rowEdit: dataChanges });
        let bikeHash = await SERVICE_IPFS.putDataToIPFS(dataChanges);
        this.props.dispatch(updateBike(rowIndex, dataChanges, bikeHash));
    }

    _renderToggle = (value, row, index) => {
        return (
            <Toggle
                labelPosition="right"
                defaultToggled={value}
                onToggle={(e, isInputChecked) => this.changeBikeInfo(isInputChecked, row, index)}
                thumbSwitchedStyle={styles.thumbSwitchedStyle}
                trackSwitchedStyle={styles.trackSwitchedStyle}
            />
        );
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
                <Datatable
                    params={this.state.params}
                    body={this.props.bikes}
                    editRow={this.editRow}
                    actions={this.state.actions}
                    toggle={this.state.toggle}
                />
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
