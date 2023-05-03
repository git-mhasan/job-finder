import axios from "../../utils/axios";

export const getJobData = async () => {
    const response = await axios.get("/jobs");

    return response.data;
};

export const addNewJob = async (data) => {
    const response = await axios.post("/jobs", data);

    return response.data;
};

export const editJob = async (id, data) => {
    const response = await axios.put(`/jobs/${id}`, data);

    return response.data;
};

export const deleteJob = async (id) => {
    const response = await axios.delete(`/jobs/${id}`);
    return response.data;
};
