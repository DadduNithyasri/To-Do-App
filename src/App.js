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
    <div className={`task ${t.completed ? "completed" : ""}`} key={index}>
      <span>{t.text}</span>
      <div className="more-icons">
        <button onClick={() => toggleComplete(tasks.indexOf(t))} title={t.completed ? "Mark Active" : "Mark Complete"}>
          <FiCheckCircle />
        </button>
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
    <>
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
            {editIndex !== null ? "Update" : "+"}
          </button>
          <span className="add-tooltip">{editIndex !== null ? "Update Task" : "Add Task"}</span>
        </div>
      </div>

      <div className="lists">
        <div className="task-box">
          <h2><FiClipboard /> Active Tasks</h2>
          {activeTasks.length === 0 ? (
            <p className="empty">No active tasks</p>
          ) : (
            activeTasks.map(renderTask)
          )}
        </div>

        <div className="task-box">
          <h2><FiCheckSquare /> Completed Tasks</h2>
          {completedTasks.length === 0 ? (
            <p className="empty">No completed tasks</p>
          ) : (
            completedTasks.map(renderTask)
          )}
        </div>
      </div>
    </div>
       <footer className="footer">
      <p>Developed By: 24255A0511, 23251A0597, 23251A05A6, 23251A0595</p>
    </footer>
</>
  );
}
export default App;

