import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "../EditBikeComponentStyle";
class BikeLocation extends Component {
    render() {
        return (
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
        );
    }
}
export default BikeLocation;
