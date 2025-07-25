import { useState } from "react";
import type { CreateTask } from "../types/Task";
import DatePicker from "react-datepicker";


interface TaskFormProps {
    onAddTask: (task: CreateTask) => void;
}

/**
*TaskForm component-input field to add new tasks
*/
function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState(''); //State to track the task title

    const [dueDate, setDueDate] = useState<Date | null>(null); //State to track the due date
    /**
    *Handles form submission to add a task
    */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //Trim whitespace and validate title
        if (!title.trim() || !dueDate) return;

        //Create a new Task object using the input value
        const newTask: CreateTask = {
            title: title.trim(), //Clean up the input 
            status: 'pending', // default status for all new tasks
            dueDate: dueDate?.toISOString().split('T')[0],
        };

        onAddTask(newTask); // pass the new task object to parent component
        setTitle(''); // reset the input field
        setDueDate(null); // reset the date picker
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
            <div>
                <label htmlFor="dueDate" className="form-label fw-semibold"> Due Date:
                </label>
                <DatePicker
                    selected={dueDate}
                    onChange={(date: Date | null) => setDueDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select due date"
                    id="dueDate"
                />
            </div>
            {/** Submit button */}
            <button className="btn btn-primary" type="submit">Add Task</button>
        </form>
    );
}
export default TaskForm;