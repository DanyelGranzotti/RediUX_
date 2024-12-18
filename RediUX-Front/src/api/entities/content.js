import * as httpRequests from "../common/api_requests";
import { URLS } from "../common/endpoints";

export const getContent = async (title = "", tag = "") => {
  try {
    const response = await httpRequests.getMethod(
      `${URLS.CONTENT}` + (title ? `?title=${title}` : "")
    );
    return response.data;
  } catch (error) {
    console.error("Error getting content:", error);
    throw error;
  }
};

export const createContent = async (content) => {
  try {
    const response = await httpRequests.postMethod(URLS.CONTENT, content);
    return response.data;
  } catch (error) {
    console.error("Error creating content:", error);
    throw error;
  }
};

export const deleteContent = async (id) => {
  try {
    const response = await httpRequests.deleteMethod(URLS.CONTENT + "/" + id);
    return response.data;
  } catch (error) {
    console.error("Error deleting content:", error);
    throw error;
  }
};

export const updateContent = async (id, content) => {
  try {
    const response = await httpRequests.putMethod(
      URLS.CONTENT + "/" + id,
      content
    );
    return response.data;
  } catch (error) {
    console.error("Error updating content:", error);
    throw error;
  }
};

export const getContentById = async (id) => {
  try {
    const response = await httpRequests.getMethod(`${URLS.CONTENT}?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting content by ID:", error);
    throw error;
  }
};
