import * as httpRequests from "../common/api_requests";
import { URLS } from "../common/endpoints";

export const getContent = async (title = "") => {
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

export const createContent = async (
  title,
  autor,
  description,
  link,
  media_type,
  tags = []
) => {
  const obj = {
    title,
    autor,
    description,
    link,
    media_type,
    tags,
  };
  console.log(obj);
  try {
    const response = await httpRequests.postMethod(URLS.CONTENT, obj);
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
