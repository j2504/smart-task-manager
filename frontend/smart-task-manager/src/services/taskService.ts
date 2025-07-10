import axios from 'axios';
import type { Task } from '../types/Task';

const Base_URL = 'http://localhost:8080/api/tasks'; //Backend url

export const getTasks = async (): Promise<Task[]> => {
    const res = await axios.get(Base_URL);
    return res.data;
}

export const createTask = async(title: string): Promise<Task> => {
    const res = await axios.post(Base_URL, {title, status:"pending"});
    return res.data;
} 

export const updateTaskStatus = async (id:number, status: Task['status']): Promise<Task> => {
    const res = await axios.put(`${Base_URL}/${id}`,{status});
    return res.data;
}

export const deleteTask = async (id: number):Promise<void> => {
     await axios.delete(`${Base_URL}/${id}`);
    
}