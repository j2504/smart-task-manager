//This is the full task returned from the backend
export interface Task{
    id: number;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: string; // Format: 'YYYY-MM-DD'
}

//This is the version used when creating a task (no id)
export interface CreateTask{
    title: string;
    status: string;
    dueDate: string;
}