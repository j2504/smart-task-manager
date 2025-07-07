import type { Task } from "../types/Task";

interface TaskListProps {
    tasks: Task[];
    onStatusChange: (id: number, status: Task['status']) => void;
    onDelete: (id: number) => void;
}

/**
* TaskList component - displays a list of tasks
*/
function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {

    return (
        <ul className="list-group">
            {tasks.map(task => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{task.title}</strong>
                        <div className="text-muted small">Status: {task.status}</div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        {/* Hidden label for accessibility*/}
                        <label htmlFor={`status-${task.id}`} className="visually-hidden">
                            Change status for task: {task.title}
                        </label>
                        <select
                            id={`status-${task.id}`}
                            className="form-select form-select-sm"
                            value={task.status}
                            onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
                        >
                            <option value={'pending'}>Pending</option>
                            <option value={'in-progress'}>In Progress</option>
                            <option value={'completed'}>Completed</option>
                        </select>

                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(task.id)}
                        >
                            <i className="bi i-trash" aria-hidden='true'></i>
                            <span className="visually-hidden">Delete task</span>
                        </button>

                    </div>

                </li>
            ))}

        </ul>
    );
}

export default TaskList;