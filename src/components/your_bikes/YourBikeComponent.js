import React, { Component } from "react";
import { MODAL_REGISTER_BIKE } from "../modal/constants";
import Datatable from "../datatable/Datatable";
import styles from "./YourBikesComponentStyle";
import EditBikeComponent from "./edit_bike/EditBikeComponent";
import Toggle from "material-ui/Toggle";
import { initUserBikes } from "../../actions/bikeActions";
import _ from "lodash";
class YourBikesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params : [
                {title: "BIKE(jSerial number)", value: "snNumber"},
                {title: "MANUFACTURER", value: "manufacturer"},
                {title: "YEAR", value: "year"},
                {title: "STATUS", value: "status"},
                {title: "FOR RENT", value: "forrent", renderer: this._renderForrent},
                {title: "ACTION", value: "View", renderer: this._renderViewAction}
            ],
            isEdit: false,
            rowEdit: {},
            rowIndex: ""
        };
    }
    _renderViewAction = (data, value, key) => {
        return (
            <a key={key} onClick={() => this.editRow(data, key)}>{value}</a>
        );
    }
    _renderForrent = (data, value) => {
        return (
            <Toggle
                labelPosition="right"
                defaultToggled={data[value]}
                thumbSwitchedStyle={styles.thumbSwitchedStyle}
                trackSwitchedStyle={styles.trackSwitchedStyle}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
            />
        );
    }
    componentDidMount() {
        const { accounts } = this.props;
        setTimeout(()=> {
            this.props.dispatch(initUserBikes({address: accounts.accounts.address, ethereum: this.props.ethereum }))
        }, 1)
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
                    body={_.orderBy(this.props.bikes.data, ["tokenId"], ["desc"])}
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
