import React, { Component } from "react";
import { MODAL_REGISTER_BIKE, MODAL_CONFIRM_TRANSACTION } from "../modal/constants";
import Datatable from "../datatable/Datatable";
import styles from "./YourBikesComponentStyle";
import EditBikeComponent from "./edit_bike/EditBikeComponent";
import Toggle from "material-ui/Toggle";
import { initUserBikes, adjustBikePrice } from "../../actions/bikeActions";
import { Dialog } from "material-ui";
import _ from "lodash";
import TextField from "material-ui/TextField";
import { toast } from "react-toastify";
class YourBikesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params : [
                {title: "BIKE(jSerial number)", value: "snNumber"},
                {title: "MANUFACTURER", value: "manufacturer"},
                {title: "MODEL", value: "model"},
                {title: "FOR RENT", value: "forRent", renderer: this._renderForrent},
                {title: "Price", value: "price", renderer: this._renderPrice},
                {title: "ACTION", value: "View", renderer: this._renderViewAction}
            ],
            isEdit: false,
            rowEdit: {},
            rowIndex: "",
            showPriceDialog: false,
            passphrase: "",
            price: "",
            tokenId: "",
            toggled: true
        };
    }
    _renderPrice = (data, value) => {
        if (!_.isUndefined(data[value]) && parseInt(data[value]) > 0) {
            return data[value];
        }
        return "";
    }
    _renderViewAction = (data, value, key) => {
        return (
            <a key={key} onClick={() => this.editRow(data, key)}>{value}</a>
        );
    }
    _renderForrent = (data, value, key) => {
        return (
            <Toggle
                labelPosition="right"
                defaultToggled={data[value]}
                thumbSwitchedStyle={styles.thumbSwitchedStyle}
                trackSwitchedStyle={styles.trackSwitchedStyle}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                onToggle={(event, value) => this.handleToggle(event, value, data.tokenId, key)}
                toggled={data[value]}
            />
        );
    }
    componentDidMount() {
        const { accounts } = this.props;
        setTimeout(()=> {
            this.props.dispatch(initUserBikes({address: accounts.accounts.address, ethereum: this.props.ethereum }));
        }, 1);
    }
    // changeBikeInfo = async (isInputChecked, rowEdit,rowIndex) => {
    //     // let dataChanges = Object.assign(rowEdit, {forRent: isInputChecked});
    //     // await this.props.dispatch(uploadModifiedBikeToIPFS(dataChanges, rowIndex));
    //     // onToggle={(e, isInputChecked) => this.changeBikeInfo(isInputChecked, row, index)}
    // }


    handleToggle = (event, value, tokenId, rowIndex) => {
        this.setState({
            tokenId: tokenId,
            rowIndex: rowIndex
        });
        if(value) {
            this.handleShowSetPriceDialog();
        } else {
            this.handleCancelSetPrice();
        }
    }

    handleShowSetPriceDialog = () => {
        this.setState({
            showPriceDialog: true
        });
    }

    handleHideSetPriceDialog = () => {
        this.setState({
            showPriceDialog: false,
            price: "",
            passphrase: ""
        });
    }
    handleCancelSetPrice = () => {
        let data = {
            address: this.props.getAccountAddress(),
            tokenId: this.state.tokenId,
            ethereum: this.props.ethereum,
            keyStore: this.props.accounts.accounts.key,
            passphrase: this.state.passphrase,
            callBack: this.handleHideSetPriceDialog,
            price: 0,
            forRent: false,
            index: this.state.rowIndex
        };
        if (this.props.metamask) {
            this.props.dispatch(adjustBikePrice(data));
        } else {
            this.props.setType(MODAL_CONFIRM_TRANSACTION, {data: data, handle: adjustBikePrice});
        }
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

    _renderPassphrase = () => {
        if (this.props.metamask) {
            return;
        }
        return (
            <TextField
                floatingLabelText="Passpharse"
                fullWidth={true}
                type="password"
                value={this.state.passphrase}
                onKeyPress={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.setState({ passphrase: e.target.value })}
            />
        );
    }
    handleKeyPress = (target) => {
        if(target.charCode===13){
            this.adjustBikePrice();
        }
    }
    validate = () => {
        if (this.state.price === "" || parseInt(this.state.price) < 0) {
            return "Invalid Price";
        }
        if (this.state.passphrase === "" && !this.props.metamask) {
            return "Invalid Passphrase";
        }
        return "";
    }
    adjustBikePrice = async () => {
        let isValid = await this.validate();
        if (isValid !== "") {
            return toast.error(isValid);
        }
        let data = {
            address: this.props.getAccountAddress(),
            tokenId: this.state.tokenId,
            ethereum: this.props.ethereum,
            keyStore: this.props.accounts.accounts.key,
            passphrase: this.state.passphrase,
            callBack: this.handleHideSetPriceDialog,
            price: this.state.price,
            forRent: true,
            index: this.state.rowIndex
        };
        this.props.dispatch(adjustBikePrice(data));
    }

    _renderView = () => {
        if (this.state.isEdit) {
            return (
                <EditBikeComponent {...this.props} switchState={this.switchState} bikeInfo={this.state.rowEdit} index={this.state.rowIndex} />
            );
        }
        return (
            <div style={styles.wrapp}>
                <Dialog
                    title="Enter price"
                    modal={false}
                    open={this.state.showPriceDialog}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={true}
                >
                    <TextField
                        floatingLabelText="Price (BKC) Per Hour"
                        fullWidth={true}
                        type="number"
                        value={this.state.price}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={(e) => this.setState({ price: e.target.value })}
                    />
                    {this._renderPassphrase()}
                    <div className="row pull-right" style={{marginTop: "50px"}}>
                        <button
                            onClick={this.handleHideSetPriceDialog}
                            style={{...styles.button, marginRight: "30px"}}
                        >
                            Cancel
                        </button>
                        <button
                            style={styles.button}
                            onClick={ () => {
                                this.adjustBikePrice();
                            }}
                        >Apply</button>
                    </div>
                </Dialog>
                <div className="text-right">
                    <button style={styles.button} onClick={() => this.props.setType(MODAL_REGISTER_BIKE)}>New Bike</button>
                </div>
                <Datatable
                    params={this.state.params}
                    body={this.props.bikes.data}
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
