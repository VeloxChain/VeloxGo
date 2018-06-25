import React, { Component } from "react";
import TextField from "material-ui/TextField";
class EditBikeForm extends Component {
    render() {
        return (
            <div>
                <TextField
                    floatingLabelText="Owner"
                    fullWidth
                    value={this.props.bikeInfo.owner}

                />
                <TextField
                    floatingLabelText="Manufacturer"
                    fullWidth
                    value={this.props.bikeInfo.manufacturer}
                    onChange={(e) => this.props.handleChangeState({manufacturer: e.target.value})}
                />
                <TextField
                    floatingLabelText="Bike Serial"
                    fullWidth
                    value={this.props.bikeInfo.snNumber}
                    onChange={(e) => this.props.handleChangeState({snNumber: e.target.value})}
                />
                <TextField
                    floatingLabelText="Bike Wallet Address"
                    fullWidth
                    value={this.props.bikeInfo.bikeAddress}
                />
            </div>
        );
    }
}
export default EditBikeForm;
