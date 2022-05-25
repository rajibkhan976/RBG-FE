import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import rootReducer from "./reducers/index";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import "./assets/css/style.css";
import "./assets/css/dev.css";
import "./assets/css/amar.css";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter as Router} from "react-router-dom";
import axios from "axios";
import {rbgInstance} from "./configuration/rbgInstance";
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

axios.interceptors.request.use(rbgInstance.authorizerInterceptor);
rbgInstance.disableProdConsole();

//const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) );
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes/>
        </Router>
        <ReduxToastr
            timeOut={0}
            newestOnTop={false}
            position="bottom-right"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            pauseOnHover={false}
            progressBar
            closeOnToastrClick/>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)).
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
