import React from "react";
import ReactDOM from "react-dom";
//import App from './App';
import App from "./routes";
import { Provider } from "react-redux";
// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";
// import rootReducer from './reducers'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "./store";

import createHistory from 'history/createHashHistory';

// import ethereum from './services/ethereum';
// const createStoreWithMiddleware = applyMiddleware()(createStore)

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk),
//         window.devToolsExtension ? window.devToolsExtension() : f => f,
//     ),
// );


// ReactDOM.render(<App />, document.getElementById('root'));
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
