import _ from "lodash";
const SUCCEEDED = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const token = localStorage.getItem("access_token");

export const post = (url, params) => {
    const parameters = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    };
    if (!_.isUndefined(token)) {
        parameters.headers.Authorization = `Bearer ${token}`;
    }
    return callApi(url, parameters);
};
export const get = (url) => {
    const parameters = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    if (!_.isUndefined(token)) {
        parameters.headers.Authorization = `Bearer ${token}`;
    }
    return callApi(url, parameters);
};
const callApi = (url, parameters) => {
    return new Promise((resolve) => {
        return fetch(url, parameters).then((response) => {
            const { status } = response;
            let msg;
            switch (status) {
            case SUCCEEDED:
                return resolve(response.json());
            case BAD_REQUEST:
                return response.json();
            case UNAUTHORIZED:
            case FORBIDDEN:
                msg = "Access denied";
                break;
            case NOT_FOUND:
                msg = `Unknown method ${url}`;
                break;
            case INTERNAL_SERVER_ERROR:
                msg = "Internal Server Error";
                break;
            default:
                msg = `Unknown Error. Status code: ${status}. URL ${url}`;
            }
            return Promise.reject(msg);
        }).then((response) => {
            if (_.isUndefined(response)) return;
            // error 400 - bad request
            let { msg } = response;
            return Promise.reject(msg);
        });
    });
};
