import React, { Component } from "react";
import Datatable from "../datatable/Datatable";
import { getContractLog } from "../../services/apiCall";
import _ from "lodash";
import moment from "moment";
import styles from "./logStyles";
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
        this._renderLogsData(logs.result);
    }
    _renderHash = (data, value) => {
        return (
            <a
                href={"https://ropsten.etherscan.io/tx/" + data[value] }
                target="_blank"
                title="View Tx hash on EtherScan">
                {data[value]}
            </a>
        );
    }
    _renderTxStatus = (status) => {
        if (status === "1") {
            return "Success";
        }
        if (status === "0") {
            return "Fail";
        }
        return status;
    }
    _renderLogsData = (logs) => {
        logs = _.reverse(logs);
        logs = _.slice(logs, 0,10);
        let stateLogs = [];
        _.forEach(logs, (log) => {
            stateLogs.push({
                hash: log.hash,
                txreceipt_status: this._renderTxStatus(log.txreceipt_status),
                timeStamp: moment(new Date(parseInt(log.timeStamp)*1000)).format("LLLL"),
            });
        });
        this.setState({
            data: stateLogs
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
