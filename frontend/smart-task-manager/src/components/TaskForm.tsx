import React, { useState } from "react";

function TaskForm() {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Task submitted:', title);
        setTitle('');
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