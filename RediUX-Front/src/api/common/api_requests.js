import axios from "axios";
import { decryptToken } from "../../AuthContext";

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
    const encryptedToken = localStorage.getItem("jwt");
    console.log("encryptedToken", encryptedToken);
    const token = encryptedToken ? decryptToken(encryptedToken) : null;
    const config = {
      method,
      url,
      data,
      params,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : undefined,
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
export const patchMethod = (url, entity) => request("patch", url, entity);
