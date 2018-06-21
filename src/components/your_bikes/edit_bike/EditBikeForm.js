import React, { Component } from "react";
import TextField from "material-ui/TextField";
import {Tabs, Tab} from "material-ui/Tabs";
import styles from "./EditBikeComponentStyle";
class EditBikeForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
    }
    render() {
        return (
            <div style={styles.wrappLeft}>
                <TextField
                    floatingLabelText="Owner"
                    fullWidth
                    value={this.props.accounts.accounts.address}
                />
                <TextField
                    floatingLabelText="Manufacturer"
                    fullWidth
                    value={this.state.manufaturer}
                />
                <TextField
                    floatingLabelText="Bike Serial"
                    fullWidth
                    value={this.state.snNumber}
                />
                <TextField
                    floatingLabelText="Bike Wallet Address"
                    fullWidth
                    value={"0x0000000000000000000000000"}
                />

                <Tabs
                    value={this.props.tabIndex}
                    onChange={this.props.handleChange}
                    tabItemContainerStyle={styles.tabItemContainerStyle}
                    style={styles.tabs}
                >
                    <Tab label="Location" value={0} style={styles.tab}>
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
                    <Tab label="Bike specifications" value={1} style={styles.tab}>
                        <div>
                            <h2>Bike specifications</h2>
                        </div>
                    </Tab>
                    <Tab label="Owner history" value={2} style={styles.tab}>
                        <div>
                            <h2>Owner history</h2>
                        </div>
                    </Tab>
                    <Tab label="Riding perfomance" value={3} style={styles.tab}>
                        <div>
                            <h2>Riding perfomance</h2>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}
export default EditBikeForm;
