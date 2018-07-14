import React, { Component } from "react";
import styles from "./RentBikeComponentStyle";
import moment from "moment";
import EditBikeForm from "../../your_bikes/edit_bike/EditBikeForm";
import BikeInfo from "../../your_bikes/edit_bike/bike_info/BikeInfo";
import RentBikeActions from "./RentBikeActions";
class RentBikeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.bikeInfo;
        this.state.totalTimeUsed = "00:00:00";
    }

    finishRentBike = () => {
        this.props.finishRentBike();
    }

    calculateTotalTimeUsed = (duration) => {
        let seconds = duration.seconds;
        if (seconds < 10) {
            seconds = "0" + seconds.toString();
        }
        let hours = duration.hours + duration.days*24;
        if (hours < 10) {
            hours = "0" + hours.toString();
        }
        let minutes = duration.minutes;
        if (minutes < 10) {
            minutes = minutes.toString();
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    }

    _renderRentalPeriod = () => {
        const { bikeInfo } = this.props;
        let startTime = moment(bikeInfo.startTime*1000);
        let now = moment();
        let duration = moment.duration(now.diff(startTime))._data;
        let totalTimeUsed = this.calculateTotalTimeUsed(duration);
        this.setState({
            totalTimeUsed: totalTimeUsed
        });
    }
    componentDidMount() {
        this.interval = setInterval(() => this._renderRentalPeriod(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { bikeInfo } = this.props.bikeInfo;
        return (
            <div style={styles.wrapp}>
                <div className="row">
                    <div className="col-sm-7">
                        <div style={styles.wrappLeft}>
                            <EditBikeForm
                                bikeInfo={bikeInfo}
                                accounts={this.props.accounts}
                                getUserProfileAddress={this.props.getUserProfileAddress}
                                isRent={true} />
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <RentBikeActions
                            {...this.props}
                            bikeInfo={this.state}
                            finishRentBike={this.finishRentBike} />
                    </div>
                    <div className="col-sm-12">
                        <BikeInfo {...this.props} bikeInfo={bikeInfo} isRent={true} />
                    </div>
                </div>
            </div>
        );
    }
}

export default RentBikeComponent;
// <div className="col-sm-8">
//     <p style={styles.title}>Manufacturer</p>
//     <h5 style={styles.text}>{this.state.bikeInfo.manufacturer}</h5>
//
//     <p style={styles.title}>Bike serial</p>
//     <h5 style={styles.text}>{this.state.bikeInfo.snNumber}</h5>
//
//     <div style={styles.dvd} />
//
//     <p style={styles.title}>Address</p>
//     <h5 style={styles.text}>{this.state.bikeInfo.location.name}</h5>
//
//     <p style={styles.title}>Price</p>
//     <h5 style={styles.text}>
//         <span style={styles.numberPrice}>200</span>
//         <img src="images/Logo.png" style={styles.logo} alt="BikeCoin" />
//     </h5>
//
//     <div style={styles.dvd} />
//
//     <div style={styles.flex}>
//         <div style={styles.block}>
//             <p style={styles.title}>Start Time</p>
//             <div style={styles.wrapper}>
//                 <span style={styles.timeStart}>{moment(this.props.bikeInfo.startTime*1000).format("LLL")}</span>
//             </div>
//         </div>
//
//         <div style={styles.block}>
//             <p style={styles.title}>Rental Duration</p>
//             <div style={styles.wrapper}>
//                 <span style={styles.timer}>{this.state.totalTimeUsed    }</span>
//             </div>
//         </div>
//     </div>
//
//     <div>
//         <button style={styles.button} onClick={this.finishRentBike}>Finish</button>
//     </div>
// </div>
