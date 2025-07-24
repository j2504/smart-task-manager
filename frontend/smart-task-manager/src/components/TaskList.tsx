import type { Task } from "../types/Task";


//Props expected from parent component (App.tsx)
interface TaskListProps {
    tasks: Task[];
    onStatusChange: (id: number, status: Task['status']) => void;
    onDelete: (id: number) => void;
    sortBy: 'status' | 'status-reverse' | 'default'; //Prop for sorting method
}

/**
* TaskList component - displays a list of tasks
*/
function TaskList({ tasks, onStatusChange, onDelete, sortBy }: TaskListProps) {

    //Function to cycle through statuses: pending -> in-progress -> completed
    const getNextStatus = (status: Task['status']): Task['status'] => {
        if (status === 'pending') return 'in-progress';
        if (status === 'in-progress') return 'completed';
        return 'pending';
    };

    //Get Bootstrap badge class based on status
    const getBadgeClass = (status: Task['status']): string => {
        switch (status) {
            case 'pending':
                return 'bg-secondary';
            case 'in-progress':
                return 'bg-info';
            case 'completed':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    //Define sort priority for each status
    const statusOrder = {
        'pending': 0,
        'in-progress': 1,
        'completed': 2
    };

    //Sort tasks based on the selected method
    const sortedTasks = [...tasks].sort((a, b) => {
        if (sortBy === 'status') {
            return statusOrder[a.status] - statusOrder[b.status]; //Ascending
        }
        if (sortBy === 'status-reverse') {
            return statusOrder[b.status] - statusOrder[a.status]; //Descending
        }
        return 0; //Default, don't sort
    });

    return (
        <ul className="list-group">
            {sortedTasks.map((task) => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {/** Display task title */}
                    <span>{task.title}</span>
                    {/** Action buttons: status badge, update, delete */}
                    <div className="d-flex align-items-center gap-2">

                        {/** Color-coded badge for current status */}
                        <span className={`badge ${getBadgeClass(task.status)}`}>
                            {task.status}
                        </span>

                        {/** Update status button (accessible) */}
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onStatusChange(task.id, getNextStatus(task.status))}
                            aria-label={`Change status of task "${task.title}"`}
                            title="Change status"
                        >
                            {/** Accessible icon with hidden text */}
                            <span aria-hidden='true'>↻</span>
                        </button>
                        {/** Delete task button (accessible) */}
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(task.id!)}
                            aria-label={`Delete task "${task.title}"`}
                            title="Delete task"
                        >
                            <span aria-hidden="true">🗑</span>
                        </button>
                    </div>

                </li>
            ))}

        </ul>
    );
}

export default TaskList;