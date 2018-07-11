import React, { Component } from "react";
import { MODAL_SUMARY_OF_BIKE } from "../modal/constants";
import styles from "./HiringRequestComponentStyle";
import loadingImage from '../../assets/images/loading.gif'


class BikeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    render() {
        return (
            <div className="col-sm-3">
                <div style={styles.block}>
                    <div style={styles.wrapper} onClick={() => this.props.setType(MODAL_SUMARY_OF_BIKE, this.props.bike)}>
                        <img
                            src={"https://gateway.ipfs.io/ipfs/" + this.props.bike.avatar}
                            alt="Bikecoin"
                            style={{...styles.bike, ...{display: this.state.loaded? 'block': 'none'}}}
                            onLoad={()=>this.setState({loaded: true })}
                        />
                        <img
                            src={loadingImage}
                            alt="Bikecoin"
                            style={{...styles.bike, ...{display: this.state.loaded? 'none': 'block'}}}
                        />
                        <div style={styles.address}>
                            <div style={styles.text}>
                                <span>{this.props.bike.location.name}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={styles.action}>
                        <div style={styles.price}>
                            <span style={styles.number}>200</span>
                            <img src="images/Logo.png" style={styles.logo} alt="BikeCoin" />
                        </div>
                        <div style={styles.dvdButton}>
                            <button style={styles.button}>book</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BikeComponent;
