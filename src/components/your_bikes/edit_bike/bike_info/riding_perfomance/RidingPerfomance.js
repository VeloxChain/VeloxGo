import React, { Component } from "react";
import RidingPerfomanceBlock from "./RidingPerfomanceBlock";
import RidingPerfomanceTabs from "./RidingPerfomanceTabs";
import RidingPerfomanceAction from "./RidingPerfomanceAction";
import RidingPerfomanceTrophies from "./RidingPerfomanceTrophies";
import styles from "../../EditBikeComponentStyle";
import RidingPerfomanceLeaderBoard from "./RidingPerfomanceLeaderBoard";

class RidingPerfomance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "today",
            show: "riding"
        };
    }

    onClickChangeType = (value) => {
        this.setState({
            type: value
        });
    }

    onClickChangeShow = (value) => {
        this.setState({
            show: value
        });
    }

    _renderContent = () => {
        if (this.state.show === "riding") {
            return (
                <div style={styles.pdContent}>
                    <RidingPerfomanceBlock type={this.state.type} />
                    <RidingPerfomanceAction onClickChangeShow={this.onClickChangeShow} />
                </div>
            );
        }

        if (this.state.show === "trophies") {
            return (
                <div style={styles.pdContent}>
                    <button style={styles.buttonBack} onClick={() => this.onClickChangeShow("riding")}>
                        <i className="fa fa-chevron-left"></i>
                        <span> BACK</span>
                    </button>
                    <RidingPerfomanceTrophies type={this.state.type} onClickChangeType={this.onClickChangeType} />
                </div>
            );
        }

        if (this.state.show === "leaderboard") {
            return (
                <div style={styles.pdContent}>
                    <button style={styles.buttonBack} onClick={() => this.onClickChangeShow("riding")}>
                        <i className="fa fa-chevron-left"></i>
                        <span> BACK</span>
                    </button>
                    <RidingPerfomanceLeaderBoard type={this.state.type} onClickChangeType={this.onClickChangeType} />
                </div>
            );
        }
    }

    render() {
        return (
            <div style={styles.content}>
                <RidingPerfomanceTabs type={this.state.type} onClickChangeType={this.onClickChangeType} />

                {this._renderContent()}
            </div>
        );
    }
}
export default RidingPerfomance;