/* eslint-disable react-refresh/only-export-components */
//src/context/TaskContext.tsx
import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "../services/taskService";
import type { Task } from "../types/Task";
import { toast } from "react-toastify";

interface TaskContextType {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    addTask: (title: string) => Promise<void>;
    updateStatus: (id: number, status: Task["status"]) => Promise<void>;
    removeTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token"); // Only fetch if logged in
        if (!token) {
            setTasks([]);
            return;
        }

        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            console.error("Failed to fetch tasks", err);
        }

    };

    const addTask = async (title: string) => {
        try {
            const newTask = await createTask(title);
            setTasks((prev) => [...prev, newTask]);
            toast.success("Task added successfully!");
        } catch (err) {
            console.error("Failed to add task", err);
            toast.error("Failed to add task");
        }
    };

    const updateStatus = async (id: number, status: Task["status"]) => {
        try {
            const updated = await updateTaskStatus(id, status);
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
            toast.success("Task updated!");
        } catch (err) {
            console.error("Failed to update task", err);
            toast.error("Error updating task");
        }
    };

    const removeTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
            toast.success("Task deleted");
        } catch (err) {
            console.error("Failed to delete task", err);
            toast.error("Error deleting task");
        }
    };

    // Load tasks only if logged in
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateStatus, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

// Custom hook
export const useTasks = () => {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error("useTasks must be used within a TaskProvider");
    return ctx;
}