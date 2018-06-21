import React, { Component } from "react";
import TextField from "material-ui/TextField";
class EditBikeForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
    }
    render() {
        return (
            <div>
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
            </div>
        );
    }
}
export default EditBikeForm;
