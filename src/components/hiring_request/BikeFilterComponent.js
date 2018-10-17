import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";

const map = "images/map.png";
const map_blue = "images/map_blue.png";
const list = "images/list.png";
const list_blue = "images/list_blue.png";

class BikeFilterComponent extends Component {

    onChangeFilter = (value) => {
        this.props.onHandleSwitchView(value);
    }

    render() {
        return (
            <div style={styles.maps}>
                <img
                    style={styles.iconFilter}
                    src={this.props.isRenderMap ? map_blue : map}
                    onClick={() => this.onChangeFilter(true)}
                    alt="VeloxGo"
                />
                <img
                    style={styles.iconFilterList}
                    src={!this.props.isRenderMap ? list_blue : list}
                    onClick={() => this.onChangeFilter(false)}
                    alt="VeloxGo"
                />
            </div>
        );
    }
}

export default BikeFilterComponent;
