import React, { Component } from "react";
import Modal from "react-modal";
import {
    OWNER_LOGIN,
    CREATE_ACCOUNT,
    EXISTING,
    METAMASK,
    IMPORT_ACCOUNT,
    CREATE_ACCOUNT_BIKECOIN,
    VERIFY,
    SHARE_DATA,
    INSUFFICIENT_FUNDS,
    // UNLOCK_ACCOUNT,
    MODAL_REGISTER_BIKE,
    REGISTER_BIKE,
    MODAL_SUMARY_OF_BIKE,
    SUMARY_OF_BIKE,
    MODAL_CREATE_ACCOUNT,
    MODAL_CREATE_ACCOUNT_BIKECOIN,
    MODAL_EXISTING,
    MODAL_METAMASK,
    MODAL_IMPORT_ACCOUNT,
    MODAL_SHARE_DATA,
    MODAL_VERIFY,
    MODAL_INSUFFICIENT_FUNDS,
    MODAL_CONFIRM_TRANSACTION,
    CONFIRM_TRANSACTION,
} from "./constants";
import NewAccount from "./body/NewAccountForm";
import OwnerLogin from "./body/OwnerLoginForm";
import Existing from "./body/ExistingForm";
import UnlockMetaMask from "./body/UnlockMetaMaskForm";
import ImportAccount from "./body/ImportAccountForm";
import CreateAccount from "./body/CreateAccountForm";
import ShareData from "./body/ShareDataForm";
import Verify from "./body/VerifyForm";
import NotEnoughEth from "./body/NotEnoughEthForm";
import ConfirmTransaction from "./body/ConfirmTransactionForm";
import RegisterBike from "./body/RegisterBike/RegisterBikeForm";
import SumaryOfBike from "./body/SumaryOfBikeForm";
class ModalCustom extends Component {
    _renderBodyModal = () => {
        switch (this.props.type) {
        case MODAL_CREATE_ACCOUNT:
            return ( <NewAccount {...this.props} /> );
        case MODAL_EXISTING:
            return ( <Existing {...this.props} /> );
        case MODAL_IMPORT_ACCOUNT:
            return ( <ImportAccount {...this.props} /> );
        case MODAL_METAMASK:
            return ( <UnlockMetaMask {...this.props} /> );
        case MODAL_CREATE_ACCOUNT_BIKECOIN:
            return ( <CreateAccount {...this.props} /> );
        case MODAL_SHARE_DATA:
            return ( <ShareData {...this.props}/> );
        case MODAL_VERIFY:
            return ( <Verify {...this.props}/> );
        case MODAL_INSUFFICIENT_FUNDS:
            return ( <NotEnoughEth {...this.props} /> );
        case MODAL_REGISTER_BIKE:
            return ( <RegisterBike {...this.props} /> );
        case MODAL_SUMARY_OF_BIKE:
            return ( <SumaryOfBike {...this.props} /> );
        case MODAL_CONFIRM_TRANSACTION:
            return ( <ConfirmTransaction {...this.props} /> );
        default:
            return ( <OwnerLogin {...this.props} /> );
        }
    }
    _renderTitleModal = () => {
        switch (this.props.type) {
        case MODAL_CREATE_ACCOUNT:
            return CREATE_ACCOUNT;
        case MODAL_EXISTING:
            return EXISTING;
        case MODAL_IMPORT_ACCOUNT:
            return IMPORT_ACCOUNT;
        case MODAL_METAMASK:
            return METAMASK;
        case MODAL_CREATE_ACCOUNT_BIKECOIN:
            return CREATE_ACCOUNT_BIKECOIN;
        case MODAL_SHARE_DATA:
            return SHARE_DATA;
        case MODAL_CONFIRM_TRANSACTION:
            return CONFIRM_TRANSACTION;
        case MODAL_VERIFY:
            return VERIFY;
        case MODAL_INSUFFICIENT_FUNDS:
            return INSUFFICIENT_FUNDS;
        case MODAL_REGISTER_BIKE:
            return REGISTER_BIKE;
        case MODAL_SUMARY_OF_BIKE:
            return SUMARY_OF_BIKE;
        default:
            return OWNER_LOGIN;
        }
    }

    render() {
        return (
            <Modal
                style={customStyles}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.closeModal}
                shouldCloseOnOverlayClick={false}
            >
                <div className="col-xs-12">
                    <div className="row">
                        <div className="mainBg h50 flexible top-modal pd10">
                            <span className="pull-left color-text title-modal">{this._renderTitleModal()}</span>
                            <span className="mg-auto"></span>
                            <a
                                className="pull-right color-text pd10 size20 closeModal"
                                onClick={this.props.closeModal}
                            >
                                <img src="images/close.png" alt="Bikecoin" style={customStyles.close} />
                            </a>
                        </div>
                        {this._renderBodyModal()}
                    </div>
                </div>
            </Modal>
        );
    }
}
const customStyles = {
    overlay: {
        "position": "fixed",
        "top": 0,
        "left": 0,
        "right": 0,
        "bottom": 0,
        "background": "rgba(0, 0, 0, 0.55)",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "zIndex": 300
    },
    content: {
        "width"       : "700px",
        "position"    : "absolute",
        "padding"     : 0,
        "top"         : "10%",
        "left"        : "unset",
        "right"       : "auto",
        "bottom"      : "auto",

    },
    close: {
        width: "15px"
    }
};

export default ModalCustom;
