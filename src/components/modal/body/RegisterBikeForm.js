import React, { Component } from "react";
import {
    Step,
    Stepper,
    StepLabel,
} from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import styles from "./CustomCss";
import RegisterBikeInformation from "./RegisterBikeInformation";
import RegisterBikeLocation from "./RegisterBikeLocation";
import RegisterBikeInvoice from "./RegisterBikeInvoice";
import RegisterBikeSuccess from "./RegisterBikeSuccess";

class RegisterBike extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0
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

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
                <RegisterBikeInformation />
            );
        case 1:
            return (
                <RegisterBikeLocation />
            );
        case 2:
            return (
                <RegisterBikeInvoice />
            );
        default:
            return (
                <RegisterBikeSuccess />
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
