import React from "react";
import ReactDOM from "react-dom";
import App from "./routes";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "./store";
import createHistory from "history/createHashHistory";

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter history={createHistory()}>
                <App />
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
);

