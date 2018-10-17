import React from "react";
import styles from "./BikeSpecificationsStyle.js";
import _ from "lodash";

const dataHeading = [
    {value: "dimension", title: "Dimension"},
    {value: "sizeS", title: "Size S"},
    {value: "sizeM", title: "Size M"},
    {value: "sizeL", title: "Size L"},
    {value: "sizeXL", title: "Size XL"},
    {value: "reference", title: "Reference In The Picture"}
];

const dataThead = [
    {dimension: "Height (US)", sizeS: "S", sizeM: "M", sizeL: "L", sizeXL: "XL", reference: ""},
    {dimension: "", sizeS: "(52)", sizeM: "(54)", sizeL: "(56)", sizeXL: "(58)", reference: ""},
    {dimension: "", sizeS: "(5'-05\" - 5'-08\")", sizeM: "(5'-08\" - 5'-10\")", sizeL: "(5'-10\" - 6'-00\")", sizeXL: "(6'-0\" - 6'-04\")", reference: ""},
    {dimension: "Height (EU)", sizeS: "(164-173)", sizeM: "(173-178)", sizeL: "(178-183)", sizeXL: "(183-193)", reference: ""},
];

const dataBody = [
    {dimension: "Wheelbase", sizeS: "1011", sizeM: "1017", sizeL: "1028", sizeXL: "1040", reference: "K"},
    {dimension: "Chainstay Length", sizeS: "432", sizeM: "432", sizeL: "443", sizeXL: "443", reference: "F"},
    {dimension: "Seattube Angle", sizeS: "74.5", sizeM: "73", sizeL: "73", sizeXL: "72.5", reference: "D"},
    {dimension: "Headtube Angle", sizeS: "70", sizeM: "70.5", sizeL: "71.5", sizeXL: "72", reference: "C"},
    {dimension: "Fork Length", sizeS: "397", sizeM: "397", sizeL: "397", sizeXL: "397", reference: "H"},
    {dimension: "Fork Rake", sizeS: "45", sizeM: "45", sizeL: "45", sizeXL: "45", reference: "J"},
    {dimension: "Headtube Length", sizeS: "161", sizeM: "181", sizeL: "206", sizeXL: "241", reference: "G"},
    {dimension: "Stem Length", sizeS: "90", sizeM: "90", sizeL: "105", sizeXL: "105", reference: "W"},
    {dimension: "Stem Angle (respect headtube axis)", sizeS: "+5", sizeM: "+5", sizeL: "+5", sizeXL: "+5", reference: "Z"},
    {dimension: "Stack", sizeS: "595", sizeM: "615", sizeL: "643", sizeXL: "677", reference: "M"},
    {dimension: "Reach", sizeS: "347", sizeM: "351", sizeL: "353", sizeXL: "359", reference: "N"},
    {dimension: "Toptube Effective", sizeS: "512,5", sizeM: "539", sizeL: "549", sizeXL: "571,5", reference: "A"},
    {dimension: "Seattube Length", sizeS: "475", sizeM: "490", sizeL: "530", sizeXL: "565", reference: "B"},
    {dimension: "Bbdrop", sizeS: "73", sizeM: "71.5", sizeL: "71.5", sizeXL: "70", reference: "E"},
    {dimension: "Seatpost Length", sizeS: "400", sizeM: "400", sizeL: "400", sizeXL: "400", reference: ""},
    {dimension: "Seatpost Diameter", sizeS: "31.6", sizeM: "31.6", sizeL: "31.6", sizeXL: "31.6", reference: ""},
    {dimension: "Crank Length", sizeS: "170", sizeM: "170", sizeL: "170", sizeXL: "170", reference: ""},
    {dimension: "Handlebar", sizeS: "700", sizeM: "720", sizeL: "740", sizeXL: "780", reference: ""},

];

class GeometryModel1C extends React.Component {

    _renderField = (data) => {
        var fields = [];
        _.forEach(dataHeading, (value, key) => {
            let style = {};
            let rowData = (data[value.value]);

            if (key === 0) {
                style = styles.bold;
            }
            fields.push(<td key={key} style={style}>{rowData}</td>);

        });

        return fields;
    }

    _renderBody = () => {
        var body = [];
        _.forEach(dataBody, (data, index) => {
            body.push(<tr key={index}>{this._renderField(data, index)}</tr>);
        });

        return body;
    }

    _renderThead = () => {
        var thead = [];
        _.forEach(dataThead, (data, index) => {
            thead.push(<tr key={index} style={styles.borderNone}>{this._renderFieldThead(data, index)}</tr>);
        });

        return thead;
    }

    _renderFieldThead = (data) => {
        var fields = [];
        _.forEach(dataHeading, (value, key) => {
            let rowData = (data[value.value]);

            fields.push(<th key={key} style={styles.borderNone}>{rowData}</th>);

        });

        return fields;
    }

    render() {
        return (
            <div>
                <div className="text-center" style={{ marginTop: "30px" }}>
                    <img src="images/model1c.png" className="image-geometries" alt="VeloxGo | Model 1C" />
                </div>
                <div className="table-responsive">
                    <table className="table table-bike" style={styles.table}>
                        <thead>
                            <tr style={styles.borderNone}>
                                <th style={styles.thGeometry}>Dimension</th>
                                <th colSpan="4" style={styles.thGeometry}>Size</th>
                                <th style={styles.thGeometryReference}>Reference In The Picture</th>
                            </tr>
                            {this._renderThead()}
                        </thead>
                        <tbody>
                            {this._renderBody()}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default GeometryModel1C;
