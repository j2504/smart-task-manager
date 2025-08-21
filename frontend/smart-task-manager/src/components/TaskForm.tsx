import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useTasks } from "../context/TaskContext.tsx";

/**
*TaskForm component-input field to add new tasks
*/
function TaskForm() {
    const [title, setTitle] = useState(''); //State to track the task title

    const [dueDate, setDueDate] = useState<Date | null>(null); //State to track the due date

    const { addTask } = useTasks();
    /**

    *Handles form submission to add a task
    */
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        //Trim whitespace and validate title
        if (!title.trim() || !dueDate) return;

        if (!title.trim() || !dueDate) return;

        await addTask(title.trim());

        setTitle("");
        setDueDate(null);
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
                */
            </div>
            {/** Submit button */}
            <button className="btn btn-primary" type="submit">Add Task</button>
        </form>
    );
}
export default TaskForm;