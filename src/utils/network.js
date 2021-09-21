import axios from 'axios';

const getDataBody = config => {
  let data = '';
  if (
    config.data &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    for (const key in config.data) {
      data = data + `${key}=${config.data[key]}&`;
    }
    // remove & last
    data = data.slice(0, data.length - 1);
  } else {
    data = config.data;
  }
  return data;
};

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const data = getDataBody(config);
    console.log(
      '%c [HTTP Interceptor Request]',
      'color: blue; font-weight: bold',
      config,
    );
    // Do something before request is sent
    return { ...config, data };
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    console.log(
      '%c [HTTP Interceptor Response]',
      'color: #248c1d; font-weight: bold',
      response,
    );
    return response;
  },
  error => {
    console.log(
      '%c [HTTP Interceptor Response Error]',
      'color: red; font-weight: bold',
      error,
    );
    return Promise.reject(error);
  },
);
// Domain for all requests
axios.defaults.baseURL = 'https://obscure-hamlet-06195.herokuapp.com/';
// Defines the max size of the http response content in bytes allowed

export default class HttpService {
  static generateHeader(headers, token) {
    headers = headers !== null ? headers : {};
    let options = {
      'Content-Type': 'application/json',
    };
    if (token != null) {
      options = {
        ...options,
        Authorization: `Bearer ${token}`,
      };
    }
    return options;
  }

  static generateHeaderImage(headers, token) {
    headers = headers !== null ? headers : {};
    let options = {
      'Content-Type': headers,
      Accept: 'application/json',
    };
    if (token != null) {
      options = {
        ...options,
        Authorization: `Bearer ${token}`,
      };
    }
    return options;
  }

  static async get(url, params, token) {
    try {
      return await axios
        .get(url, {
          headers: {
            get: this.generateHeader('urlencoded', token),
          },
          params: params,
        })
        .then(response => response.data);
    } catch (error) {
      console.log('error', error.response);
      throw error.response;
    }
  }

  static async post(url, body, params, token) {
    try {
      return await axios
        .post(url, body, {
          headers: {
            post: this.generateHeader('urlencoded', token),
          },
          params: params,
        })
        .then(response => response.data);
    } catch (error) {
      console.log('error', error.response);
      return error.response.data;
    }
  }

  static async postFormData(url, formData, token) {
    try {
      return await axios
        .post(url, formData, {
          headers: {
            post: this.generateHeaderImage('form-data', token),
          },
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  static async put(url, data, config, token) {
    try {
      const configHeaders = config && config.headers ? config.headers : null;
      return await axios
        .put(url, data, {
          headers: this.generateHeader(configHeaders, token),
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  static async patch(url, data, config, token) {
    try {
      const configHeaders = config && config.headers ? config.headers : null;
      return await axios
        .patch(url, data, {
          headers: this.generateHeader(configHeaders, token),
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  static async delete(url, config, token) {
    try {
      const configHeaders = config && config.headers ? config.headers : null;
      return await axios
        .delete(url, {
          headers: this.generateHeader(configHeaders, token),
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  static async postConfig(url, body, config, params, token) {
    try {
      const configAxios = axios.create({
        baseURL: '',
      });
      const configHeaders =
        config.toLowerCase() === 'urlencoded' ? 'urlencoded' : 'json';
      return await configAxios
        .post(url, body, {
          headers: {
            post: this.generateHeader(configHeaders, token),
          },
          params: params,
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }
}
