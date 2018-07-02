import React, { Component } from "react";
import { MODAL_REGISTER_BIKE } from "../modal/constants";
import Datatable from "../datatable/Datatable";
import styles from "./YourBikesComponentStyle";
import EditBikeComponent from "./edit_bike/EditBikeComponent";
import Toggle from "material-ui/Toggle";
import { initBikes } from "../../actions/bikeActions";
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
                {name: "View", handle: this.editRow}
            ],
            toggle: {
                "forrent":  this._renderToggle
            },
            isEdit: false,
            rowEdit: {},
            rowIndex: ""
        };
    }
    componentDidMount() {
        const { accounts } = this.props;
        this.props.dispatch(initBikes({address: accounts.accounts.address, ethereum: this.props.ethereum }));
    }
    // changeBikeInfo = async (isInputChecked, rowEdit,rowIndex) => {
    //     // let dataChanges = Object.assign(rowEdit, {forRent: isInputChecked});
    //     // await this.props.dispatch(uploadModifiedBikeToIPFS(dataChanges, rowIndex));
    //     // onToggle={(e, isInputChecked) => this.changeBikeInfo(isInputChecked, row, index)}
    // } row, index

    _renderToggle = (value) => {
        return (
            <Toggle
                labelPosition="right"
                defaultToggled={value}
                thumbSwitchedStyle={styles.thumbSwitchedStyle}
                trackSwitchedStyle={styles.trackSwitchedStyle}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
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
                    body={this.props.bikes.data}
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
