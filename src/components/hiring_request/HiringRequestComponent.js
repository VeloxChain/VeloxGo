import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import TextField from "material-ui/TextField";
import {Tabs, Tab} from "material-ui/Tabs";
import Toggle from "material-ui/Toggle";

class HiringRequestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "a",
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <div style={styles.wrapp}>
                <div className="row">
                    <div className="col-sm-7">
                        <div style={styles.wrappLeft}>
                            <TextField
                                floatingLabelText="Owner"
                                fullWidth
                            />
                            <TextField
                                floatingLabelText="Manufacturer"
                                fullWidth
                            />
                            <TextField
                                floatingLabelText="Bike Serial"
                                fullWidth
                            />
                            <TextField
                                floatingLabelText="Bike Wallet Address"
                                fullWidth
                            />

                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                tabItemContainerStyle={styles.tabItemContainerStyle}
                                style={styles.tabs}
                            >
                                <Tab label="Location" value="a" style={styles.tab}>
                                    <div style={styles.location}>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <TextField
                                                    floatingLabelText="Address"
                                                    fullWidth
                                                />
                                            </div>
                                            <div className="col-sm-4">
                                                <button style={styles.buttonSave}>Save</button>
                                            </div>
                                        </div>
                                        <iframe
                                            title={"googlemaps"}
                                            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d15348.641730062593!2d108.35025619999999!3d15.9006638!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1529391376898"
                                            style={{border:0, width: "100%", height: "300px", marginTop: 20}}
                                        />
                                    </div>
                                </Tab>
                                <Tab label="Bike specifications" value="b" style={styles.tab}>
                                    <div>
                                        <h2>Bike specifications</h2>
                                    </div>
                                </Tab>
                                <Tab label="Owner history" value="c" style={styles.tab}>
                                    <div>
                                        <h2>Owner history</h2>
                                    </div>
                                </Tab>
                                <Tab label="Riding perfomance" value="d" style={styles.tab}>
                                    <div>
                                        <h2>Riding perfomance</h2>
                                    </div>
                                </Tab>
                            </Tabs>

                        </div>
                    </div>
                    <div className="col-sm-5">
                        <div style={styles.wrappRight}>
                            <div style={styles.boxLeft}>
                                <img src="images/bike.png" alt="Bikecoin" style={styles.bike} />
                            </div>
                            <div style={styles.boxRight}>
                                <div>
                                    <button style={styles.buttonTransfer}>Transfer</button>
                                    <button style={styles.buttonDelete}>Delete</button>
                                    <Toggle
                                        label="UNLOCKED"
                                        labelPosition="right"
                                        style={styles.toggle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HiringRequestComponent;
