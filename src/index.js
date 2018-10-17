import React from "react";
import ReactDOM from "react-dom";
import App from "./routes";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "./store";
import history from "./history";

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={history}>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
);
