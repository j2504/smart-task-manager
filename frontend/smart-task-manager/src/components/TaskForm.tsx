import { useState } from "react";

interface TaskFormProps {
    onAddTask: (title: string) => void;
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

        //Prevent adding empty or whitespace-only tasks
        if (title.trim()) {
            onAddTask(title.trim());
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Enter task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Add</button>
        </form>
    );
}
export default TaskForm;