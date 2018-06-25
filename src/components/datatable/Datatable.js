import React, { Component } from "react";
import _ from "lodash";
import styles from "./DatatableStyle";
import Toggle from "material-ui/Toggle";

class Datatable extends Component {

    _renderHeader = () => {
        var heading = [];
        _.forEach(this.props.params, (data, key) => {
            heading.push(<th key={key} style={styles.borderNone}>{data.title}</th>);
        });
        return heading;
    }

    _renderAction = (row, rowIndex) => {
        var actions = [];
        _.forEach(this.props.actions, (action, keyAction) => {
            actions.push(<a key={keyAction} onClick={() => action.handle(row, rowIndex)}>{action.name}</a>);
        });
        return actions;
    }

    _renderField = (data, rowIndex) => {
        var fields = [];
        _.forEach(this.props.params, (value, key) => {
            let rowData = (data[value.value]);

            if (value.value === "action") {
                rowData = (this._renderAction(data, rowIndex));
            }

            if (value.value === "forRent") {
                rowData = (
                    <Toggle
                        labelPosition="right"
                        defaultToggled={data[value.value]}
                        thumbSwitchedStyle={styles.thumbSwitchedStyle}
                        trackSwitchedStyle={styles.trackSwitchedStyle}
                    />
                );
            }

            fields.push(<td key={key}>{rowData}</td>);
        });

        return fields;
    }

    _renderBody = () => {
        var body = [];
        _.forEach(this.props.body, (data, index) => {
            body.push(<tr key={index}>{this._renderField(data, index)}</tr>);
        });
        return body;
    }

    _renderTfoot = () => {
        var tfoot = [];
        let length = _.size(this.props.params);

        tfoot.push(
            <td colSpan={length} key="colSpan" className="text-right" style={styles.tdColSpan}>
                <a style={styles.more}>
                    Show More
                </a>
            </td>
        );

        return tfoot;
    }

    render() {
        return (
            <table className="table" style={styles.table}>
                <thead style={styles.thead}>
                    <tr>
                        {this._renderHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this._renderBody()}
                </tbody>
                <tfoot>
                    <tr>
                        {this._renderTfoot()}
                    </tr>
                </tfoot>
            </table>
        );
    }
}

export default Datatable;
