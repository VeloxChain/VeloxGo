import React, { Component } from "react";
import styles from "../../EditBikeComponentStyle";
import Avatar from "material-ui/Avatar";
import {List, ListItem} from "material-ui/List";
import _ from "lodash";

const Item = ({item}) => {
    return (
        <ListItem
            primaryText={item.name}
            leftAvatar={<Avatar src={item.avatar} />}
            style={styles.listItemLeaderBoard}
        />
    );
};

class RidingPerfomanceLeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "1",
            data: [
                {avatar: "images/avatar.png", name: "Eric Bui"},
                {avatar: "images/avatar.png", name: "Tony Nguyen"},
                {avatar: "images/avatar.png", name: "Vuong Pham"},
                {avatar: "images/avatar.png", name: "Lay Vo"}
            ]
        };
    }

    onChangeType = (value) => {
        this.setState({
            type: value
        });
    } 

    _renderItem = () => {
        let renderList = [];

        _.forEach(this.state.data, (value, index) => {
            renderList.push(<Item item={value} key={index} />);
        });

        return renderList;
    }

    render() {
        return (
            <div style={styles.rowTrophies} className="text-center">
                <div className="btn-group" role="group">
                    <button
                        type="button"
                        style={this.state.type === "1" ? styles.butonLeaderBoardActive : styles.butonLeaderBoard}
                        onClick={() => this.onChangeType("1")}
                    >
                        Distance
                    </button>
                    <button
                        type="button"
                        style={this.state.type === "2" ? styles.butonLeaderBoardActive : styles.butonLeaderBoard}
                        onClick={() => this.onChangeType("2")}
                    >
                        Elevation
                    </button>
                </div>
                
                <List>
                    {this._renderItem()}
                </List>
            </div>
        );
    }
}
export default RidingPerfomanceLeaderBoard;