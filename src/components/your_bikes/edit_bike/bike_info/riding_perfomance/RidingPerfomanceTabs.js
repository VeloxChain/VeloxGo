import React, { Component } from "react";
import styles from "../../EditBikeComponentStyle";

class RidingPerfomanceTabs extends Component {

    render() {
        return (
            <div className="btn-group" role="group" style={styles.group}>
                <button
                    type="button"
                    style={this.props.type === "today" ? styles.butonRidingActive : styles.butonRiding}
                    onClick={() => this.props.onClickChangeType("today")}
                >
                    Today
                </button>
                <button
                    type="button"
                    style={this.props.type === "week" ? styles.butonRidingActive : styles.butonRiding}
                    onClick={() => this.props.onClickChangeType("week")}
                >
                    Week
                </button>
                <button
                    type="button"
                    style={this.props.type === "month" ? styles.butonRidingActive : styles.butonRiding}
                    onClick={() => this.props.onClickChangeType("month")}
                >
                    Month
                </button>
                <button
                    type="button"
                    style={this.props.type === "year" ? styles.butonRidingActive : styles.butonRiding}
                    onClick={() => this.props.onClickChangeType("year")}
                >
                    Year
                </button>
                <button
                    type="button"
                    style={this.props.type === "all" ? styles.butonRidingActive : styles.butonRiding}
                    onClick={() => this.props.onClickChangeType("all")}
                >
                    All
                </button>
            </div>
        );
    }
}
export default RidingPerfomanceTabs;