import React, { Component } from "react";
import {
    Step,
    Stepper,
    StepLabel,
} from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import styles from "./CustomCss";
import ImageUpload from "./ImageUploadForm";

class RegisterBike extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0,
            logo: "",

            data: {
                manufacturer: "Volata Cycles",
                owner: "Vuong Pham",
                bike_serial: "2018-BKC-ZbX75728iFp5"
            }
        };
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex <= 2) {
            this.setState({
                stepIndex: stepIndex + 1,
            });
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleChangeImage(value) {
        this.setState({
            logo: value
        });
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
                <div className="wrapp">
                    <div className="w100p">
                        <ImageUpload
                            value={this.state.logo}
                            handleChangeImage={value => this.handleChangeImage(value)}
                        />
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <TextField
                                    floatingLabelText="Manufacturer"
                                    value={this.state.data.manufacturer}
                                    fullWidth
                                />
                                <TextField
                                    floatingLabelText="Owner"
                                    value={this.state.data.owner}
                                    fullWidth
                                />
                                <TextField
                                    floatingLabelText="Bike serial"
                                    value={this.state.data.bike_serial}
                                    fullWidth
                                    style={styles.mb20}
                                />
                                
                                <p style={styles.upload}>Upload your invoice</p>
                                <input
                                    type="file"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className="wrapp">
                    <div className="w100p">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <TextField
                                    floatingLabelText="Enter your bike location"
                                    fullWidth
                                />
                                <iframe
                                    title={"googlemaps"}
                                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d15348.641730062593!2d108.35025619999999!3d15.9006638!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1529391376898"
                                    style={{border:0, width: "100%", height: "300px", marginTop: 10}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className="wrapp">
                    <div className="w100p">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <div className="invoice">
                                    <h4>By register your bike!</h4>
                                    <h3 className="color-web">You will receive 20BKC</h3>
                                </div>
                                <TextField
                                    floatingLabelText="Enter your passport wallet"
                                    fullWidth
                                    style={styles.mb20}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div className="wrapp">
                    <div className="w100p text-center">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <h3 className="text-success">You bike register successfully!</h3>
                                <img src="images/success.png" className="success" alt="Bikecoin" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: "0 16px"};

        return (
            <div>
                <Stepper activeStep={stepIndex} style={styles.step}>
                    <Step>
                        <StepLabel style={styles.stepLabel} className="step-label" iconContainerStyle={{display: "block"}}>
                            <span className="text-step">Bike Information</span>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel style={styles.stepLabel} className="step-label" iconContainerStyle={{display: "block"}}>
                            <span className="text-step">Location</span>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel style={styles.stepLabel} className="step-label" iconContainerStyle={{display: "block"}}>
                            <span className="text-step">Invoice</span>
                        </StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    <div>{this.getStepContent(stepIndex)}</div>
                    <div className="row" style={{marginTop: 12}}>
                        <div className="col-sm-6">
                            <RaisedButton
                                label="Back"
                                primary={true}
                                disabled={stepIndex === 0}
                                onClick={this.handlePrev}
                                style={styles.mb20}
                            />
                        </div>
                        <div className="col-sm-6 text-right">
                            <RaisedButton
                                label={stepIndex > 2 ? "Finish" : "Next"}
                                primary={true}
                                onClick={this.handleNext}
                                style={styles.mb20}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterBike;
