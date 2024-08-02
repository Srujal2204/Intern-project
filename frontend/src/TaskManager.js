import React, { useEffect, useState } from "react";
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash, FaMoon, FaSun } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTask, GetAllTasks, UpdateTask } from "./api";
import { notify } from "./utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import './TaskManager.css'; // Custom CSS

function TaskManager() {
    const [input, setInput] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setcopyTasks] = useState([]);
    const [updateTask, setupdateTask] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleTask = () => {
        if (updateTask && input && dueDate) {
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                dueDate,
                description,
                _id: updateTask._id
            }
            handleUpdate(obj);
        } else if (updateTask === null && input && dueDate) {
            handleAddTask();
        }
        setInput('');
        setDueDate('');
        setDescription('');
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
            setDueDate(updateTask.dueDate.split('T')[0]);
            setDescription(updateTask.description || ''); // Set description for editing
        }
    }, [updateTask]);

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false,
            dueDate,
            description
        }
        try {
            const { success, message } = await CreateTask(obj);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    }

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            setTasks(data);
            setcopyTasks(data);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    }

    const getReminders = (tasks) => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        return tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate.toDateString() === today.toDateString() ||
                   dueDate.toDateString() === tomorrow.toDateString();
        });
    };

    const reminders = getReminders(tasks);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTask(id);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName, dueDate, description } = item;
        const obj = {
            taskName,
            isDone: !isDone,
            dueDate,
            description
        }
        try {
            const { success, message } = await UpdateTask(_id, obj);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    }

    const handleUpdate = async (item) => {
        const { _id, isDone, taskName, dueDate, description } = item;
        const obj = {
            taskName,
            isDone,
            dueDate,
            description
        }
        try {
            const { success, message } = await UpdateTask(_id, obj);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTask = [...copyTasks];
        const results = oldTask.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
    }

    const isTaskOverdue = (dueDate) => {
        const today = new Date();
        const taskDueDate = new Date(dueDate);
        return taskDueDate < today;
    }

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="mb-5 text-center">Task Management System</h1>
                    <button onClick={toggleDarkMode} className="btn btn-outline-secondary">
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
                {/* Input and search box */}
                <div className="row mb-4">
                    <div className="col-md-8 mb-3">
                        <div className="input-group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="form-control"
                                placeholder="Add a new Task"
                            />
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="form-control"
                            />
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                                placeholder="Add a description"
                            />
                            <button onClick={handleTask} className="btn btn-success">
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaSearch />
                            </span>
                            <input
                                onChange={handleSearch}
                                type="text"
                                className="form-control"
                                placeholder="Search tasks"
                            />
                        </div>
                    </div>
                </div>
                {/* List of items */}
                <div className="task-list">
                    {tasks.map((item) => (
                        <div key={item._id} className="card mb-2 shadow-sm">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className={isTaskOverdue(item.dueDate) ? 'text-decoration-line-through' : ''}>
                                        {item.taskName}
                                    </h5>
                                    <p className="mb-1">
                                        <span className="badge bg-info me-2">Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                                        <span className="badge bg-warning">Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                                    </p>
                                    <p className="text-muted">{item.description}</p>
                                </div>
                                <div className="btn-group">
                                    <button onClick={() => handleCheckAndUncheck(item)} className="btn btn-success btn-sm">
                                        <FaCheck />
                                    </button>
                                    <button onClick={() => setupdateTask(item)} className="btn btn-primary btn-sm">
                                        <FaPencilAlt />
                                    </button>
                                    <button onClick={() => handleDeleteTask(item._id)} className="btn btn-danger btn-sm">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            </div>
        </div>
    );
}

export default TaskManager;
