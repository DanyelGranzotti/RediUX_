import * as httpRequests from "../common/api_requests";
import { URLS } from "../common/endpoints";

export const getTag = async (name = "") => {
  try {
    const response = await httpRequests.getMethod(
      `${URLS.TAG}` + (name ? `?name=${name}` : "")
    );
    return response.data;
  } catch (error) {
    console.error("Error getting tag:", error);
    throw error;
  }
};

export const createTag = async (name) => {
  const obj = { name };
  try {
    const response = await httpRequests.postMethod(URLS.TAG, obj);
    return response.data;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
};

export const deleteTag = async (id) => {
  try {
    const response = await httpRequests.deleteMethod(URLS.TAG + "/" + id);
    return response.data;
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
};
