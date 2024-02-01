import axiosInstance from "../context/AxiosInstance";


export const getTaskByDate = (date) => {
    return axiosInstance.get(`/task/list/${date}`);
};

export const getTaskById = (id) => {
    return axiosInstance.get(`/task/${id}`);
};

export const createTask = (body) => {
    return axiosInstance.post('/task/create', body);
};

export const updateTask= (id, body) => {
    return axiosInstance.put(`/task/${id}/`, body);
};

export const deleteTask= (id) => {
    return axiosInstance.delete(`/task/${id}/`);
};