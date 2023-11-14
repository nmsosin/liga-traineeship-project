import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from 'src/constants/urlEndpoints';
import { paths } from 'src/types/api';
import { TTask } from 'src/types/tasks';

export type GetTasksResponse = paths['/tasks']['get']['responses'][200]['content']['application/json'];
export type GetCurrentTaskResponse = paths['/tasks/{taskId}']['get']['responses'][200]['content']['application/json'];
export type AddTasksResponse = paths['/tasks']['post']['responses'][200]['content']['application/json'];
export type UpdateTasksResponse = paths['/tasks/{taskId}']['patch']['responses'][200]['content']['application/json'];
export type DeleteTasksResponse =
  paths['/tasks/{taskId}']['delete']['responses'][200]['content']['application/json; charset=utf-8'];

export const checkAxiosResponse = (res: AxiosResponse) => {
  return res ? res.data : (err: Error | AxiosError) => Promise.reject(err);
};

export async function requestGetAll(urlEndpoint: string, options?: AxiosRequestConfig) {
  const url = `${BASE_URL}/${urlEndpoint}`;
  return await axios.get<GetTasksResponse>(url, options).then(checkAxiosResponse);
}

export async function requestGetCurrent(urlEndpoint: string, options?: AxiosRequestConfig) {
  const url = `${BASE_URL}/${urlEndpoint}`;
  return await axios.get<GetCurrentTaskResponse>(url, options).then(checkAxiosResponse);
}

export async function requestAdd(urlEndpoint: string, newTask: TTask, options?: AxiosRequestConfig) {
  const url = `${BASE_URL}/${urlEndpoint}`;
  return await axios.post<AddTasksResponse>(url, newTask, options).then(checkAxiosResponse);
}

export async function requestUpdate(urlEndpoint: string, task: TTask, options?: AxiosRequestConfig) {
  const url = `${BASE_URL}/${urlEndpoint}`;
  return await axios.patch<UpdateTasksResponse>(url, task, options).then(checkAxiosResponse);
}

export async function requestDelete(urlEndpoint: string, id: number, options?: AxiosRequestConfig) {
  const url = `${BASE_URL}/${urlEndpoint}`;
  return await axios.delete<DeleteTasksResponse>(url, options).then(checkAxiosResponse);
}
