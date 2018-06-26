import React, { Component } from "react";
import styles from "../EditBikeComponentStyle";
class RidingPerfomance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                today: {
                    distance: 123,
                    time: {
                        hour: "2",
                        minute: "24"
                    },
                    elev_gain: "234",
                    energy: "234"
                },
                week: {
                    distance: 3.232,
                    time: {
                        hour: "22",
                        minute: "24"
                    },
                    elev_gain: "14.233",
                    energy: "34.333"
                },
                month: {
                    distance: 34.539,
                    time: {
                        hour: "543",
                        minute: "54"
                    },
                    elev_gain: "45.322",
                    energy: "54.435.343"
                },
                year: {
                    distance: 111.391,
                    time: {
                        hour: "6.153",
                        minute: "32"
                    },
                    elev_gain: "235.795",
                    energy: "40.000.102"
                },
                all: {
                    distance: 351.391,
                    time: {
                        hour: "41.353",
                        minute: "50"
                    },
                    elev_gain: "9.049.828",
                    energy: "230.249.828"
                }
            },
            type: "today"
        };
    }

    onClick = (value) => {
        this.setState({
            type: value
        });
    }

    render() {
        return (
            <div style={styles.wrapRiding}>
                <div style={styles.containerRiding}>
                    <div style={styles.blockTitle}>
                        <h3 style={styles.marginZero}>TODAY</h3>
                    </div>
                    <div style={styles.containerBlock}>
                        <div style={styles.flexible}>
                            <div style={styles.block}>
                                <p style={styles.marginZero}>
                                    <span style={styles.count}>243</span>
                                    <span style={styles.unit}> mi</span>
                                </p>
                                <p style={styles.text}>Distance</p>
                            </div>
                        </div>
                        <div style={styles.flexible}>
                            <div style={styles.block}>
                                <p style={styles.marginZero}>
                                    <span style={styles.count}>243</span>
                                    <span style={styles.unit}> h</span>
                                    <span style={styles.count}>12</span>
                                    <span style={styles.unit}> m</span>
                                </p>
                                <p style={styles.text}>Time</p>
                            </div>
                        </div>
                        <div style={styles.flexible}>
                            <div style={styles.block}>
                                <p style={styles.marginZero}>
                                    <span style={styles.count}>302</span>
                                    <span style={styles.unit}> ft</span>
                                </p>
                                <p style={styles.text}>Elev gain</p>
                            </div>
                        </div>
                        <div style={styles.flexible}>
                            <div style={styles.block}>
                                <p style={styles.marginZero}>
                                    <span style={styles.count}>1.250</span>
                                    <span style={styles.unit}> Cal</span>
                                </p>
                                <p style={styles.text}>Energy</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default RidingPerfomance;

// <div className="row">
//     <div className="col-sm-3">
//         <div style={styles.block}>
//          <p>
//     <span style={styles.count}>{data[type].distance}</span>
//     <span style={styles.unit}> mi</span>
// </p>
// <p style={styles.text}>Distance</p>
//         </div>
//     </div>
//     <div className="col-sm-3">
//         <div style={styles.block}>
//             <p>
//                 <span style={styles.count}>{data[type].time.hour}</span>
//                 <span style={styles.unit}> h</span>
//                 <span style={styles.count}> {data[type].time.minute}</span>
//                 <span style={styles.unit}> m</span>
//             </p>
//             <p style={styles.text}>Time</p>
//         </div>
//     </div>
//     <div className="col-sm-3">
//         <div style={styles.block}>
//             <p>
//                 <span style={styles.count}>{data[type].elev_gain}</span>
//                 <span style={styles.unit}> ft</span>
//             </p>
//             <p style={styles.text}>Elev gain</p>
//         </div>
//     </div>
//     <div className="col-sm-3">
//         <div style={styles.block}>
//             <p>
//                 <span style={styles.count}>{data[type].energy}</span>
//                 <span style={styles.unit}> Cal</span>
//             </p>
//             <p style={styles.text}>Energy</p>
//         </div>
//     </div>
// </div>
