import React, { useState } from "react";
import { FiTrash2, FiEdit2, FiCheckCircle, FiClipboard, FiCheckSquare } from "react-icons/fi";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (task.trim() === "") return;
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null);
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const renderTask = (t, index) => (
    <div className="task" key={index}>
      <span>{t.text}</span>
      <button
        className="complete-btn"
        onClick={() => toggleComplete(tasks.indexOf(t))}
        title={t.completed ? "Mark Active" : "Mark Complete"}
      >
        <FiCheckCircle />
      </button>
      <div className="more-icons">
        {!t.completed && (
          <button onClick={() => editTask(tasks.indexOf(t))} title="Edit Task">
            <FiEdit2 />
          </button>
        )}
        <button onClick={() => deleteTask(tasks.indexOf(t))} title="Delete Task">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );

  return (
    <div className="app">
      <h1>To-Do App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <div className="add-wrapper">
          <button className="add-btn" onClick={addTask}>
            +
          </button>
          <span className="add-tooltip">{editIndex !== null ? "Edit Task" : "Add Task"}</span>
        </div>
      </div>

      <div className="lists">
        <div className="task-box active">
          <h2><FiClipboard className="box-icon" /> Active Tasks</h2>
          {activeTasks.length === 0 ? (
            <p className="empty">No active tasks</p>
          ) : (
            activeTasks.map((t, index) => renderTask(t, index))
          )}
        </div>

        <div className="task-box completed">
          <h2><FiCheckSquare className="box-icon" /> Completed Tasks</h2>
          {completedTasks.length === 0 ? (
            <p className="empty">No completed tasks</p>
          ) : (
            completedTasks.map((t, index) => renderTask(t, index))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

