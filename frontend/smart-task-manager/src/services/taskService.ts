import apiClient from './apiClient';
import type { Task } from '../types/Task';

const TASKS_URL = '/tasks'; //relative to apiClient's baseURL

export const getTasks = async (): Promise<Task[]> => {
    const res = await apiClient.get(TASKS_URL);
    return res.data;
}

export const createTask = async(title: string): Promise<Task> => {
    const res = await apiClient.post(TASKS_URL, {title, status:"pending"});
    return res.data;
} 

export const updateTaskStatus = async (id:number, status: Task['status']): Promise<Task> => {
    const res = await apiClient.put(`${TASKS_URL}/${id}`,{status});
    return res.data;
}

export const deleteTask = async (id: number):Promise<void> => {
     await apiClient.delete(`${TASKS_URL}/${id}`);
    
}