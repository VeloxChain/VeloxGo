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
import SERVICE_IPFS from "../../../services/ipfs";
import { createBike } from "../../../actions/bikeActions";
class RegisterBike extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0,
            stepOne: {
                imageData: "",
                imageName: "",
                invoiceData: "",
                invoiceName: "",
                imagePreview: "",
                manufacturer: "Volata Cycles",
                owner: this.props.accounts.accounts.address || this.props.accounts.address,
                snNumber: ""
            },
            stepTwo: {
                location: ""
            },
            stepThree: {
                passphrase: ""
            }
        };
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex < 2) {
            this.setState({
                stepIndex: stepIndex + 1,
            });
            return;
        }
        if (stepIndex === 2) {
            this.registerBike();
            return;
        }
        this.props.closeModal();
    };

    registerBike = async () => {
        const { stepOne, stepTwo } = this.state;
        let [hashImage, hashInvoice] = [ await SERVICE_IPFS.putFileToIPFS(stepOne.imageData), await SERVICE_IPFS.putFileToIPFS(stepOne.invoiceData)];
        let bike = {
            avatar: {
                name: stepOne.imageName,
                hash: hashImage
            },
            invoice: {
                name: stepOne.invoiceName,
                hash: hashInvoice
            },
            snNumber: stepOne.snNumber ,
            manufacturer: stepOne.manufacturer,
            owner: stepOne.owner,
            year: 2018,
            location: stepTwo.location,
            status: "ACTIVE",
            forRent: false,
            bikeAddress: "0x0000000000000000000000000000000000000000"
        };
        // let hashBike = await SERVICE_IPFS.putDataToIPFS(bike);
        await this.props.dispatch(createBike(bike));
        this.setState((prevState) => {
            return { stepIndex: prevState+1 };
        });
    }

    handleChangeState = (data) => {
        const {stepIndex, stepOne, stepTwo, stepThree} = this.state;
        let dataChanges;
        if (stepIndex === 0) {
            dataChanges = Object.assign(stepOne, data);
            this.setState({ stepOne: dataChanges });
            return;
        }
        if (stepIndex === 1) {
            dataChanges = Object.assign(stepTwo, data);
            this.setState({ stepTwo: dataChanges });
            return;
        }
        if (stepIndex === 2) {
            dataChanges = Object.assign(stepThree, data);
            this.setState({ stepThree: dataChanges });
            return;
        }
    }

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
                <RegisterBikeInformation {...this.props} handleChangeState={this.handleChangeState} info={this.state.stepOne} />
            );
        case 1:
            return (
                <RegisterBikeLocation {...this.props} handleChangeState={this.handleChangeState} info={this.state.stepTwo} />
            );
        case 2:
            return (
                <RegisterBikeInvoice {...this.props} handleChangeState={this.handleChangeState} info={this.state.stepThree} />
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
