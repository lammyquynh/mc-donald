import HttpService from "./network"

export const getData = async (url, params, callback) => {
    const res = await HttpService.get(url, params);
    callback(res.result);
}

export const putData = async (url, data, config, token, callback) => {
    const res = await HttpService.put(url, data, config, token);
    callback(res);
}

export const postData = async (url, data, config, token, callback) => {
    const res = await HttpService.post(url, data, null, token);
    callback(res);
}