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
                        {this._renderPreviousPaging()}
                        {this._renderContentPaging()}
                        {this._renderNextPaging()}
                    </ul>
                </div>
            );
        }
        return;
    }

    _renderPreviousPaging = () => {
        if (this.state.pageActive > 1) {
            return (
                <li>
                    <button onClick={() => this.onChangePage("Previous")}>Previous</button>
                </li>
            );
        }

        return (
            <li>
                <a style={styles.none}>Previous</a>
            </li>
        );
    }

    _renderNextPaging = () => {
        let totalPage = Math.ceil(this.props.body.length/10);

        if (this.state.pageActive < totalPage) {
            return (
                <li>
                    <button onClick={() => this.onChangePage("Next")}>Next</button>
                </li>
            );
        }

        return (
            <li>
                <a style={styles.none}>Next</a>
            </li>
        );
    }

    pagination = (currentPage, nrOfPages) => {
        var delta = 1,
            range = [],
            rangeWithDots = [],
            l;

        range.push(1);

        if (nrOfPages <= 1){
            return range;
        }

        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i < nrOfPages && i > 1) {
                range.push(i);
            }
        }
        range.push(nrOfPages);

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

    _renderContentPaging = () => {
        let totalPage = Math.ceil(this.props.body.length/10);
        let listPageNumber = this.pagination(this.state.pageActive, totalPage);

        return listPageNumber.map((pageNumber, index) => {
            if(!_.isNumber(pageNumber)) {
                return (
                    <li key={index} className={this.state.pageActive === pageNumber ? "active" : ""}>
                        <span style={styles.loadMore}>{pageNumber}</span>
                    </li>
                );
            }
            return <li key={index} className={this.state.pageActive === pageNumber ? "active" : ""}><a onClick={() => this.onChangePage(pageNumber)}>{pageNumber}</a></li>;

        });
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
