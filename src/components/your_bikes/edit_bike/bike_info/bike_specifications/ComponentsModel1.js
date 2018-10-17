import React from "react";
import styles from "./BikeSpecificationsStyle.js";
import _ from "lodash";

const dataHeading = [
    {value: "parts", title: "Parts"},
    {value: "suppliers", title: "Suppliers"},
    {value: "description", title: "Description"}
];

const dataBody = [
    {parts: "Frame", suppliers: "VOLATA CYCLES", description: "Volata aluminum 7005 alloy"},
    {parts: "Fork", suppliers: "VOLATA CYCLES", description: "Volata carbon fork. 1.5' headset"},
    {parts: "Front Hub", suppliers: "SHIMANO", description: "Alfine dynamo hub DH-S501"},
    {parts: "Rear Hub", suppliers: "SHIMANO", description: "Alfine 11 speed S705 Di2"},
    {parts: "Tires", suppliers: "VITTORIA", description: "Zaffiro Pro black 700x32c"},
    {parts: "Spokes", suppliers: "DTSWISS", description: "Competiton standard 2.0/1.8/2.0"},
    {parts: "Rims", suppliers: "DTSWISS", description: "R460 DB, ready to tubeless, 32 Holes"},
    {parts: "Front Disk", suppliers: "SHIMANO", description: "XT Ice-Tech SM-RT81 160mm"},
    {parts: "Rear Disk", suppliers: "SHIMANO", description: "XT Ice-Tech SM-RT81 140mm"},
    {parts: "Calipers", suppliers: "SHIMANO", description: "ST-R785 Di2"},
    {parts: "Brake Lever", suppliers: "SHIMANO", description: "ST-R785 Di2"},
    {parts: "Crankset", suppliers: "SHIMANO", description: "FC-S501 170mm"},
    {parts: "Belt", suppliers: "CARBON DRIVE", description: "CDX belt 120T black (size L-XL). CDX belt 118T black (size S-M)"},
    {parts: "Rear Sprocket", suppliers: "CARBON DRIVE", description: "CDX 28T Di2"},
    {parts: "Front Sprocket", suppliers: "CARBON DRIVE", description: "CDX Center Track Di2 50T"},
    {parts: "Tape", suppliers: "FIZIK", description: "Performance 3mm Tacky"},
    {parts: "Saddle Aliante R5", suppliers: "FIZIK", description: "Aliante R5"},
    {parts: "Saddle Woman Vesta", suppliers: "FIZIK", description: "Vesta R5"},
    {parts: "Handlebar", suppliers: "FIZIK", description: "Cyrano R5 Bull"},
    {parts: "Seatpost", suppliers: "FIZIK", description: "Cyrano R5"},
    {parts: "Headset", suppliers: "DEDAELEMENTI", description: "In-5 integrated 1 1/8'-1,2'"},
    {parts: "Pedals", suppliers: "CRANKBROTHERS", description: "Double Shot"},
    {parts: "Bottom Bracket", suppliers: "SHIMANO", description: "Tiagra BB-RS500"},
    {parts: "Frame Sizes", suppliers: "", description: "S, M, L, XL"},
    {parts: "Colour", suppliers: "", description: "Ice White, Moon Gray"},
    {parts: "Weight", suppliers: "", description: "23.3lb (10.6 kg) Size M"},
];

class ComponentsModel1 extends React.Component {

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

    _renderHeader = () => {
        var heading = [];
        _.forEach(dataHeading, (data, key) => {
            heading.push(<th key={key} style={styles.th}>{data.title}</th>);
        });
        return heading;
    }
    
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-bike" style={styles.table}>
                    <thead>
                        <tr>
                            {this._renderHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderBody()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ComponentsModel1;
