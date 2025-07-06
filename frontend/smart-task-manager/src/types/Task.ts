export interface Task{
    id: number;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
}