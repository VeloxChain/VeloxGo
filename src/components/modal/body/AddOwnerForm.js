import React, { Component } from "react";
import TextField from "material-ui/TextField";
import styles from "./CustomCss";

class AddOwnerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ""
        };
    }

    handleChange = (newState) => {
        this.setState({
            ...this.state,
            ...newState
        });
    }

    render() {
        return (
            <div className="wrappOwner">
                <div className="col-sm-8 col-sm-offset-2">
                    <TextField
                        floatingLabelText="Email"
                        value={this.state.email}
                        fullWidth
                        onChange={(e) => this.handleChange({email: e.target.value})}
                    />
                    <div style={styles.actionAddOwner}>
                        <button style={styles.button}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddOwnerForm;
