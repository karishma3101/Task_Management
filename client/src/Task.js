// Task.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Task.css';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [date, setDate] = useState('');
    const [filterGenre, setFilterGenre] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:3003/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const addTask = () => {
        if (taskName && description && genre && date) {
            axios.post('http://localhost:3003/tasks', { taskName, description, genre, date })
                .then(response => {
                    setTasks([...tasks, response.data]);
                    setTaskName('');
                    setDescription('');
                    setGenre('');
                    setDate('');
                })
                .catch(error => {
                    console.error('Error adding task:', error);
                });
        } else {
            alert("Please fill in all fields");
        }
    };

    const deleteTask = (taskId) => {
        axios.delete(`http://localhost:3003/tasks/${taskId}`)
            .then(() => {
                const updatedTasks = tasks.filter(task => task._id !== taskId);
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    const updateTask = (taskId) => {
        const updatedTask = tasks.find(task => task._id === taskId);
        const updatedTaskName = prompt("Enter your new task") || updatedTask.taskName;
        const updatedDescription = prompt("Enter the new description of the task") || updatedTask.description;
        const updatedGenre = prompt("Enter the new genre of the task") || updatedTask.genre;
        const updatedDate = prompt("Enter the new date to complete the task (YYYY-MM-DD)") || updatedTask.date;

        axios.put(`http://localhost:3003/tasks/${taskId}`, { taskName: updatedTaskName, description: updatedDescription, genre: updatedGenre, date: updatedDate })
            .then(response => {
                const updatedTasks = tasks.map(task => {
                    if (task._id === taskId) {
                        return response.data;
                    }
                    return task;
                });
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };

    const handleFilterChange = (event) => {
        setFilterGenre(event.target.value);
    };

    const filteredTasks = filterGenre ? tasks.filter(task => task.genre === filterGenre) : tasks;

    return (
        <div className="task-container">
            <h1 className='title'>Task</h1>
            <div className="add-task-form">
                <input type="text" value={taskName} onChange={handleTaskNameChange} placeholder="Task Name" />
                <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
                <input type="text" value={genre} onChange={handleGenreChange} placeholder="Genre" />
                <input type="text" value={date} onChange={handleDateChange} placeholder="Complete by (YYYY-MM-DD)" />
                <button className="add-task-button" onClick={addTask}>Add Task</button>
            </div>
            <div className="filter-container">
                <label>Filter by Genre:</label>
                <select value={filterGenre} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Study">Study</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div>
                {filteredTasks.map((item, index) => (
                    <div key={index} className="task">
                        <h1>{index + 1}. {item.taskName}</h1>
                        <p>Description: {item.description}</p>
                        <p>Genre: {item.genre}</p>
                        <p>Complete by: {item.date}</p>
                        <div className="button-container">
                            <button className="delete-task-button" onClick={() => deleteTask(item._id)}>Delete Task</button>
                            <button className="update-task-button" onClick={() => updateTask(item._id)}>Update Task</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;
