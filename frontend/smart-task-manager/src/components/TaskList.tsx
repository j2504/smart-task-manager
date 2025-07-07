import type { Task } from "../types/Task";

interface TaskListProps {
    tasks: Task[];
}

/**
* TaskList component - displays a list of tasks
*/
function TaskList({ tasks }: TaskListProps) {
    return (
        <ul className="list-group">
            {tasks.map(task => (
                <li
                    key={task.id}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    {task.title}
                    <span className="badge bg-secondary text-capitalize">
                        {task.status}
                    </span>
                </li>
            ))}

        </ul>
    );
}

export default TaskList;