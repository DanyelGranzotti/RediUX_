import axios from "axios";

const handleError = (error) => {
  if (error?.response?.status === 401) {
    localStorage.clear();
  }

  if (error.code === "ERR_NETWORK") {
    console.error(error);
    window.location.href = "/error";
  }

  throw error;
};

const request = async (method, url, data = null, params = null) => {
  try {
    const config = {
      method,
      url,
      data,
      params,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const response = await axios(config);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const postMethod = (url, entity) => request("post", url, entity);
export const getMethod = (url) => request("get", url);
export const getMethodWithParams = (url, params) =>
  request("get", url, null, params);
export const putMethod = (url, entity) => request("put", url, entity);
export const deleteMethod = (url) => request("delete", url);
