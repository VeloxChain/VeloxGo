import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";

class BikeFilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilter: true
        };
    }

    onChangeFilter = (value) => {
        this.props.onChangeFilter(value);

        this.setState({
            isFilter: value
        });
    }

    render() {
        return (
            <div style={styles.maps}>
                <i
                    className="fa fa-list"
                    style={this.state.isFilter ? styles.iconFilter : styles.icon}
                    onClick={() => this.onChangeFilter(true)}    
                />
                <i
                    className="fa fa-map-marker"
                    style={!this.state.isFilter ? styles.iconFilter : styles.icon}
                    onClick={() => this.onChangeFilter(false)}    
                />
            </div>
        );
    }
}

export default BikeFilterComponent;