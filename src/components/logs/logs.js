import React, { Component } from "react";
import Datatable from "../datatable/Datatable";
import { getContractLog } from "../../services/apiCall";
import _ from "lodash";
import moment from "moment";
import styles from "./logStyles";
import constants from "../../services/constants";
class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params : [
                {title: "Tx Hash", value: "hash", renderer: this._renderHash},
                {title: "Time Stamp", value: "timeStamp"},
                {title: "Status", value: "txreceipt_status"}
            ],
            data: []
        };
    }
    componentDidMount() {
        this.getLogs();
    }
    getLogs = async () => {
        let logs = await getContractLog();
        this._renderLogsData(logs.items);
    }
    _renderHash = (data, value) => {
        return (
            <a
                href={constants.TX_URL + data[value] }
                target="_blank"
                title="View Tx hash on EtherScan">
                {data[value]}
            </a>
        );
    }
    _renderTxStatus = (status) => {
        if (status === true) {
            return "Success";
        }
        if (status === false) {
            return "Fail";
        }
        return status;
    }
    _renderLogsData = (logs) => {
        // logs = _.reverse(logs);
        // logs = _.slice(logs, 0,10);
        let stateLogs = [];
        _.forEach(logs, (log) => {
            stateLogs.push({
                hash: log.hash,
                txreceipt_status: this._renderTxStatus(log.status),
                timeStamp: moment(new Date(log.timestamp || log.createdAt)).format("LLLL"),
            });
        });
        this.setState({
            data: stateLogs,
        });
    }
    render() {
        return (
            <div style={styles.wrapp}>
                <h2>Transaction Logs</h2>
                <Datatable
                    params={this.state.params}
                    body={this.state.data}
                />
            </div>

        );
    }
}
export default Logs;
