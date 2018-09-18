import React, { Component } from "react";
import styles from "../../EditBikeComponentStyle";

class RidingPerfomanceAction extends Component {
    render() {
        return (
            <div style={styles.actionRiding}>
                <button
                    style={styles.buttonActionTrophies}
                    onClick={() => this.props.onClickChangeShow("trophies")}
                >
                    <img src="images/trophie.png" alt="Velox Go" style={styles.iconButton} />
                    Trophies
                </button>
                <button
                    style={styles.buttonActionLeaderboard}
                    onClick={() => this.props.onClickChangeShow("leaderboard")}
                >
                    <img src="images/leaderboard.png" alt="Velox Go" style={styles.iconButton} />
                    Leaderboard
                </button>
            </div>
        );
    }
}
export default RidingPerfomanceAction;