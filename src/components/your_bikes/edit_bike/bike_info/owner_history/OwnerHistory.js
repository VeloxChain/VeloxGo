import React from "react";
import Datatable from "../../../../datatable/Datatable";
import styles from "./OwnerHistoryStyle";
import { MODAL_ADD_OWNER } from "../../../../modal/constants";
// import constants from "../../../../../services/constants";
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
        this.setState({
            data: ownerHistory
        });
    }
    render() {
        return (
            <div className="table-bike">
                <div style={styles.action}>
                    <button
                        style={styles.button}
                        onClick={() => this.props.setType(MODAL_ADD_OWNER)}
                    >
                        Add Owner
                    </button>
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
