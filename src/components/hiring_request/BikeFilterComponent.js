import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";

class BikeFilterComponent extends Component {
    constructor(props) {
        super(props);
    }

    onChangeFilter = (value) => {
        this.props.onHandleSwitchView(value);
    }

    render() {
        return (
            <div style={styles.maps}>
                <i
                    className="fa fa-list"
                    style={!this.props.isRenderMap ? styles.iconFilter : styles.icon}
                    onClick={() => this.onChangeFilter(false)}    
                />
                <i
                    className="fa fa-map-marker"
                    style={this.props.isRenderMap ? styles.iconFilter : styles.icon}
                    onClick={() => this.onChangeFilter(true)}    
                />
            </div>
        );
    }
}

export default BikeFilterComponent;