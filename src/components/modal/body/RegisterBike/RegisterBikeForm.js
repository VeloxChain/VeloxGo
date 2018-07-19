import React, { Component } from "react";
import styles from "../CustomCss";
import RegisterBikeInformation from "./RegisterBikeInformation";
import RegisterBikeLocation from "./RegisterBikeLocation";
import RegisterBikeConfirm from "./RegisterBikeConfirm";
import RegisterBikeSuccess from "./RegisterBikeSuccess";
import { uploadNewBikeToIPFS } from "../../../../actions/bikeActions";
import { toast } from "react-toastify";
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
                snNumber: "",
                model: "Model 1"
            },
            stepTwo: {
                location: {
                    name: null,
                    long: null,
                    lat: null,
                    country: {
                        name: null,
                        code: null,
                    },
                    cityName: null,
                },
            },
            stepThree: {
                passphrase: ""
            }
        };
    }

    validate = () => {
        const {stepIndex, stepOne, stepTwo, stepThree} = this.state;
        if (stepIndex === 0) {
            if (stepOne.imageData === "" || stepOne.invoiceData === "" || stepOne.snNumber === "" || stepOne.manufacturer === "") {
                return false;
            }
        }
        if (stepIndex === 1) {
            if (stepTwo.location.name === null || stepTwo.location.long === null || stepTwo.location.lat === null) {
                return false;
            }
        }
        if (stepIndex === 2 && !this.props.isMetamask) {
            if (stepThree.passphrase === "") {
                return false;
            }
        }
        return true;
    }

    handleNext = async () => {
        const {stepIndex} = this.state;
        let isValidate = await this.validate();
        if (!isValidate) {
            toast.error("Invalid! Please fill out the form.");
            return;
        }
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
    _callBack = () => {
        this.setState({stepIndex: 3});
    }
    registerBike = async () => {
        const { stepOne, stepTwo, stepThree } = this.state;
        await this.props.dispatch(uploadNewBikeToIPFS({
            bikeInfo: stepOne,
            location: stepTwo.location,
            callBack: this._callBack,
            keyStore: this.props.accounts.accounts.key,
            passphrase: stepThree.passphrase,
            ethereum: this.props.ethereum
        }));

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
                <RegisterBikeConfirm {...this.props} handleChangeState={this.handleChangeState} info={this.state.stepThree} />
            );
        default:
            return (
                <RegisterBikeSuccess />
            );
        }
    }
    _renderButtonLabel = () => {
        const {stepIndex} = this.state;
        if (stepIndex === 2) {
            return "Submit";
        }
        if (stepIndex < 2) {
            return "Next";
        }
        return "Finish";
    }

    _renderStep = (number) => {
        if (this.state.stepIndex >= number) {
            return (
                <div className={number === 1 ? "step-tab second active" : "step-tab last active"}>
                    <div style={styles.count}>
                        {
                            this.state.stepIndex > number ?
                            <img src="images/check.png" style={styles.icon} alt="BikeCoin" />
                            : 
                            <span style={styles.number}>{number + 1}</span>
                        }
                    </div>
                </div>
            );
        }

        return (
            <div className={number === 1 ? "step-tab" : "step-tab last"}>
                <div style={styles.block}></div>
            </div>
        );
    }

    _renderStepFirst = () => {
        return (
            <div className="step-tab active">
                <div style={styles.count}>
                    {
                        this.state.stepIndex > 0 ?
                        <img src="images/check.png" style={styles.icon} alt="BikeCoin" />
                        : 
                        <span style={styles.number}>1</span>
                    }
                </div>
            </div>
        );
    }

    render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: "0 16px"};
        return (
            <div>
                <div style={styles.stepTabs}>
                    <div style={styles.stepTab}>
                        <div>
                            <h4 className="text-center">Bike Information</h4>
                            { this._renderStepFirst() }
                        </div>
                    </div>
                    <div style={styles.stepTab}>
                        <div>
                            <h4 className="text-center">Location</h4>
                            { this._renderStep(1) }
                        </div>
                    </div>
                    <div style={styles.stepTab}>
                        <div>
                            <h4 className="text-center">Confirm</h4>
                            { this._renderStep(2) }
                        </div>
                    </div>
                </div>

                <div style={contentStyle}>
                    <div>{this.getStepContent(stepIndex)}</div>
                    <div className="row" style={styles.actionRegister}>
                        <div className="col-sm-6 col-xs-6">
                            <button
                                disabled={stepIndex === 0}
                                onClick={this.handlePrev}
                                style={styles.buttonBack}
                            >
                                Back
                            </button>
                        </div>
                        <div className="col-sm-6 col-xs-6 text-right">
                            <button
                                onClick={this.handleNext}
                                style={styles.buttonBack}
                            >
                                {this._renderButtonLabel()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterBike;
