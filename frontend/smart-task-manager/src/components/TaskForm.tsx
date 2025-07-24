import { useState } from "react";
import type { CreateTask } from "../types/Task";


interface TaskFormProps {
    onAddTask: (task: CreateTask) => void;
}

/**
*TaskForm component-input field to add new tasks
*/
function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState('');
    /**
    *Handles form submission to add a task
    */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //Trim whitespace and validate title
        if (!title.trim()) return;

        //Create a new Task object using the input value
        const newTask: CreateTask = {
            title: title.trim(), //Clean up the input 
            status: 'pending', // default status for all new tasks
        };

        onAddTask(newTask); // pass the new task object to parent component
        setTitle(''); // reset the input field
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
            {/** Label for the input field */}
            <label htmlFor="taskTitle" className="form-label fw-semibold"> Add New Task:
            </label>
            {/** Input field for task title */}
            <input
                type="text"
                className="form-control"
                placeholder="Enter task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {/** Submit button */}
            <button className="btn btn-primary" type="submit">Add Task</button>
        </form>
    );
}
export default TaskForm;