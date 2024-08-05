import axios from "axios";

export const addData = async (data) => {
  try {
    const response = await axios.post("/api/contacts", data);
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw new Error(error.message);
  }
};

export const getData = async () => {
  try {
    const response = await axios.get("/api/contacts");
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw new Error(error.message);
  }
};
//heloo

export const removeData = async (id) => {
  try {
    const response = await axios.delete(`/api/contacts?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error(error.message);
  }
};

export const updateData = async (id, data) => {
  try {
    const response = await axios.put(`/api/contacts?id=${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error(error.message);
  }
};
