import React, { Component } from "react";
import styles from "./EditBikeComponentStyle";
import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import _ from "lodash";
const Item = ({item}) => {
    return (
        <ListItem
            primaryText={item.route}
            style={styles.listItem}
            secondaryText={
                <p>{item.totalTime}</p>
            }
            secondaryTextLines={1}
            rightIcon={<img src="images/graph.png" style={styles.icon} />}
        />
    );
};

class BikeActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {route: "San Francisco - Sausalito", totalTime: "183.11 mi 37 sec 34.21 mph", date: "4-12"},
                {route: "Sausalito - Monaco", totalTime: "243.82 mi 56 sec 28.92 mph", date: "4-16"},
                {route: "Monaco - Panama", totalTime: "324.49 mi 19 sec 88.1 mph", date: "4-25"},
                {route: "Panama - New York", totalTime: "128.52 mi 44 sec 76.34 mph", date: "5-1"},
                {route: "New York - Paris", totalTime: "99.13 mi 32 sec 86.70 mph", date: "5-17"},
                {route: "Paris - Sydney", totalTime: "125.34 mi 01 sec 69.17 mph", date: "5-29"},
            ]
        };
    }
    _renderItem = () => {
        let items = [];
        _.forEach(this.state.data, (row, index) => {
            items.push(<Item item={row} key={index} />);
        });
        return items;
    }
    render() {
        return (
            <List style={styles.list}>
                <Subheader>Activites</Subheader>
                {this._renderItem()}
            </List>
        );
    }
}
export default BikeActivities;
