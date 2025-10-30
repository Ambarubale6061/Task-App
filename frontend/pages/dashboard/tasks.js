import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:5000/api/v1/tasks";

  async function loadTasks() {
    const res = await fetch(API, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setTasks(data);
  }

  async function handleAdd() {
    if (!title) return alert("Enter task title");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description: desc }),
    });

    setTitle("");
    setDesc("");
    setEditingId(null);
    loadTasks();
  }

  async function handleEdit(task) {
    setTitle(task.title);
    setDesc(task.description);
    setEditingId(task._id);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this task?")) return;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    loadTasks();
  }

  async function toggleComplete(task) {
    await fetch(`${API}/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ completed: !task.completed }),
    });
    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 p-8 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Manage Tasks</h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="font-semibold mb-4 text-gray-700">
            {editingId ? "Edit Task" : "Add Task"}
          </h2>
          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mb-3 rounded"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`p-5 rounded-xl shadow hover:shadow-lg transition ${
                task.completed ? "bg-green-50" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3
                  className={`font-bold text-lg ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h3>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
              </div>

              <p className="text-gray-600 text-sm mb-3 mt-2">
                {task.description}
              </p>

              <div className="flex justify-between text-sm">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
