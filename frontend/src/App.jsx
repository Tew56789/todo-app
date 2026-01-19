import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // โหลด todos จาก Mongo ตอนเปิดหน้า
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  // ➕ เพิ่ม todo (บันทึก Mongo)
  const addTodo = async () => {
    if (!text.trim()) return;

    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text }),
    });

    setText("");
    fetchTodos();
  };

  // ✅ toggle completed
  const toggleTodo = async (id, completed) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    fetchTodos();
  };

  // ❌ ลบ todo
  const removeTodo = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Todo App
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Plan your day effectively
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="rounded-xl bg-blue-500 px-5 py-2 text-white text-sm font-medium hover:bg-blue-600 active:scale-95 transition"
          >
            Add
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 shadow-sm hover:shadow-md transition"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleTodo(todo._id, todo.completed)
                  }
                  className="accent-blue-500"
                />
                <span
                  className={`text-sm ${
                    todo.completed
                      ? "line-through text-slate-400"
                      : "text-slate-700"
                  }`}
                >
                  {todo.title}
                </span>
              </label>

              <button
                onClick={() => removeTodo(todo._id)}
                className="text-slate-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {todos.filter((t) => t.completed).length} / {todos.length} tasks completed
        </div>
      </div>
    </div>
  );
}
