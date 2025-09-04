import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trash2 } from "lucide-react";
import "./TodoApp.css";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">✨TO-DO LIST✨</h1>

        {/* Input */}
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="input"
          />
          <button onClick={addTask} className="button">Add</button>
        </div>

        {/* Counter */}
        <div className="counter-row">
          <span>Total: {tasks.length}</span>
          <span>Completed: {tasks.filter((t) => t.completed).length}</span>
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="task-item"
            >
              <div
                className={`task-text ${t.completed ? "completed" : ""}`}
                onClick={() => toggleTask(t.id)}
              >
                <CheckCircle
                  size={20}
                  color={t.completed ? "green" : "lightgray"}
                  style={{ marginRight: 8 }}
                />
                <span>{t.text}</span>
              </div>
              <Trash2
                size={20}
                color="red"
                onClick={() => deleteTask(t.id)}
                style={{ cursor: "pointer" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
