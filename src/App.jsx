import { useState } from "react";
import "./App.css";

function Tab({ title, active, onClick }) {
  return (
    <div className={`tabItem ${active ? "activeTab" : ""}`} onClick={onClick}>
      {title}
    </div>
  );
}

function Task({ item, onToggle, onDelete }) {
  return (
    <div
      className="taskItem"
      style={{ backgroundColor: "#f3f4f6", border: "none", padding: "10px" }}
    >
      <input
        type="checkbox"
        checked={item.done}
        onChange={onToggle}
        style={{ cursor: "pointer", width: "16px", height: "16px" }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: item.done ? "line-through" : "none",
          color: item.done ? "#F3F4F6" : "#000",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
        }}
      >
        {item.text}
      </span>
      <button
        onClick={onDelete}
        style={{
          background: "none",
          border: "none",
          color: "#ef4444",
          cursor: "pointer",
          fontSize: "14px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Delete
      </button>
    </div>
  );
}

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");

  function handleAdd() {
    if (text.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: text, done: false }]);
    setText("");
  }

  function handleToggle(id) {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.done));
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (status === "active") return !todo.done;
    if (status === "completed") return todo.done;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.done).length;
  const totalCount = todos.length;

  return (
    <div
      className="appBackground"
      style={{ alignItems: "flex-start", paddingTop: "60px" }}
    >
      <div className="container" style={{ height: "auto", minHeight: "290px" }}>
        <h2 className="boardTitle">To-Do List</h2>

        <div className="inputContainer">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="inputBox"
          />
          <button onClick={handleAdd} className="button">
            Add
          </button>
        </div>

        <div className="tabContainer">
          <Tab
            title="All"
            active={status === "all"}
            onClick={() => setStatus("all")}
          />
          <Tab
            title="Active"
            active={status === "active"}
            onClick={() => setStatus("active")}
          />
          <Tab
            title="Completed"
            active={status === "completed"}
            onClick={() => setStatus("completed")}
          />
        </div>

        <div className="taskContainer">
          {filteredTodos.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                color: "#6B7280",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {status === "all" && "No tasks yet. Add one above!"}
              {status === "active" && "No active tasks!"}
              {status === "completed" && "No completed tasks yet!"}
            </div>
          ) : (
            filteredTodos.map((item) => (
              <Task
                key={item.id}
                item={item}
                onToggle={() => handleToggle(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "8px",
            borderTop: "1px solid #e5e7eb",
            fontSize: "14px",
            color: "#6b7280",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <span>
            {completedCount} of {totalCount} tasks completed
          </span>
          {completedCount > 0 && (
            <button
              onClick={handleClearCompleted}
              style={{
                background: "none",
                border: "none",
                color: "#ef4444",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
              }}
            >
              Clear completed
            </button>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
            marginTop: "8px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Powered by <span style={{ color: "#3c82f6" }}>Pinecone academy</span>
        </div>
      </div>
    </div>
  );
}

export default App;
