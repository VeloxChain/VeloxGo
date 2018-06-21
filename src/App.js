import React, { Component } from "react";
import { connect } from "react-redux";
import MainElement from "./routes/index";

class App extends Component {

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.ethereumNode){
            nextProps.ethereumNode.watch();
        }
    }
    render() {
        return (
            <MainElement/>
        );
    }
}

const mapStateToProps = state => ({
    ethereumNode: state.connection.ethereum,
    currentBlock: state.global.currentBlock,
    connected: state.global.connected,
});

export default connect(mapStateToProps)(App);
