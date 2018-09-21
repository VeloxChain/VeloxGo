import React from "react";
import Datatable from "../../../../datatable/Datatable";
import styles from "./OwnerHistoryStyle";
import { MODAL_ADD_OWNER } from "../../../../modal/constants";
// import constants from "../../../../../services/constants";
import { toast } from "react-toastify";
import _ from "lodash";
class OwnerHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: [
                {value: "to", title: "Ex-Owner Address"}
            ],
            data: []
        };
    }
    componentDidMount() {
        let ownerHistories = localStorage.getItem("ownerHistories");
        ownerHistories = JSON.parse(ownerHistories);
        let ownerHistory = _.filter(ownerHistories, (history) => history.tokenId === this.props.bikeInfo.tokenId);
        if (ownerHistory.length > 0) {
            ownerHistory = _.reverse(ownerHistory);
            ownerHistory[0].to = ownerHistory[0].to + " (YOU)";
        }
        this.setState({
            data: ownerHistory
        });
    }
    notifyFeatures = () => {
        toast.info("This feature is not supported in MVP");
    }
    _renderAddExOwner = () => {
        if (this.props.isRent) {
            return;
        }
        return (
            <button
                style={styles.button}
                onClick={this.notifyFeatures}
                // onClick={() => this.props.setType(MODAL_ADD_OWNER)}
            >
                Add Ex-Owner
            </button>
        );
    }
    render() {
        return (
            <div className="table-bike">
                <div style={styles.action}>
                    {this._renderAddExOwner()}
                </div>
                <Datatable
                    params={this.state.heading}
                    body={this.state.data}
                />
            </div>
        );
    }
}

export default OwnerHistory;
