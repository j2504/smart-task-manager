import { useTasks } from "../context/TaskContext.tsx";

/**
* TaskList component - displays a list of tasks
*/
function TaskList() {
    const { tasks, updateStatus, removeTask } = useTasks();

    return (
        <div>
            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task.id} className="d-flex justify-content-between align-items-center mb-2">
                        <span>{task.title}</span>
                        <div>
                            <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => updateStatus(task.id, "completed")}
                            >
                                ✅
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => removeTask(task.id)}
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default TaskList;