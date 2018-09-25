import React, { Component } from "react";
import _ from "lodash";
import styles from "./DatatableStyle";

class Datatable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageActive: 1,
        };
    }

    _renderHeader = () => {
        var heading = [];
        _.forEach(this.props.params, (data, key) => {
            heading.push(<th key={key} style={styles.th}>{data.title}</th>);
        });
        return heading;
    }

    _renderField = (data, rowIndex) => {
        var fields = [];
        _.forEach(this.props.params, (value, key) => {
            let rowData;
            if (value.renderer) {
                rowData = value.renderer(data, value.value, rowIndex);
            } else {
                rowData = (data[value.value]);
            }
            fields.push(<td key={key} style={styles.textTd}>{rowData}</td>);

        });

        return fields;
    }

    _renderBody = () => {
        var body = [];
        let item = _.slice(this.props.body, (this.state.pageActive - 1)*10, (this.state.pageActive)*10);
        _.forEach(item, (data, index) => {
            body.push(<tr key={index}>{this._renderField(data, index)}</tr>);
        });
        return body;
    }

    _renderPaging = () => {
        let totalPage = Math.ceil(this.props.body.length/10);
        if (totalPage > 0) {
            return (
                <div className="text-right">
                    <ul className="pagination">
                        <li><a href="#" onClick={() => this.onChangePage("Previous")}>Previous</a></li>
                        {this._renderContentPaging()}
                        <li><a href="#" onClick={() => this.onChangePage("Next")}>Next</a></li>
                    </ul>
                </div>
            );
        }
        return;
    }

    _renderContentPaging = () => {
        let totalPage = Math.ceil(this.props.body.length/10);
        let renderPage = [];
        for (let i = 1; i <= totalPage; i++) {
            renderPage.push(<li key={i} className={this.state.pageActive == i ? "active" : ""}><a href="#" onClick={() => this.onChangePage(i)}>{i}</a></li>);
        }
        return renderPage;
    }

    onChangePage = (active) => {
        let totalPage = Math.ceil(this.props.body.length/10);

        if (active === "Previous") {
            if (this.state.pageActive > 1) {
                this.setState({
                    pageActive: this.state.pageActive - 1
                });
            }
            return;
        }

        if (active === "Next") {
            if (this.state.pageActive < totalPage) {
                this.setState({
                    pageActive: this.state.pageActive + 1
                });
            }
            return;
        }

        this.setState({
            pageActive: active
        });
        return;
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table" style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            {this._renderHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderBody()}
                    </tbody>
                </table>
                {this._renderPaging()}
            </div>
        );
    }
}

export default Datatable;
