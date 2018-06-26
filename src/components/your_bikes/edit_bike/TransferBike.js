import React, { Component } from "react";
import Toggle from "material-ui/Toggle";
import styles from "./EditBikeComponentStyle";
class TransferBike extends Component {
    render() {
        return (
            <div style={styles.wrappRight}>
                <div style={styles.boxLeft}>
                    <img src={"https://gateway.ipfs.io/ipfs/" + this.props.bikeInfo.avatar.hash } alt="Bikecoin" style={styles.bike} />
                </div>
                <div style={styles.boxRight}>
                    <div>
                        <button style={styles.buttonTransfer}>Transfer</button>
                        <button style={styles.buttonDelete} onClick={this.props.deytroyBike}>Destroy</button>
                        <Toggle
                            label="UNLOCKED"
                            labelPosition="right"
                            defaultToggled={this.props.bikeInfo.isLocked}
                            onToggle={(e, isInputChecked) => this.props.handleChangeState({isLocked: isInputChecked})}
                            thumbSwitchedStyle={styles.thumbSwitchedStyle}
                            trackSwitchedStyle={styles.trackSwitchedStyle}
                            trackStyle={styles.track}
                            thumbStyle={styles.thumb}
                            style={styles.toggle}
                        />
                        <Toggle
                            label="LOST BIKE"
                            labelPosition="right"
                            defaultToggled={this.props.bikeInfo.isLost}
                            onToggle={(e, isInputChecked) => this.props.handleChangeState({isLost: isInputChecked})}
                            thumbSwitchedStyle={styles.thumbSwitchedStyle}
                            trackSwitchedStyle={styles.trackSwitchedStyle}
                            trackStyle={styles.track}
                            thumbStyle={styles.thumb}
                            style={styles.toggle}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default TransferBike;
