import * as httpRequests from "../common/api_requests";
import { URLS } from "../common/endpoints";

export const loginUser = async (email, password) => {
  const obj = { email, password };
  try {
    const response = await httpRequests.postMethod(URLS.USER + "/signin", obj);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signupUser = async (email, password) => {
  const obj = { email, password };
  try {
    const response = await httpRequests.postMethod(URLS.USER + "/signup", obj);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
