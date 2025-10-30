import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const token = localStorage.getItem("token");
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/tasks", {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setTasks(data);
  }

  async function addTask(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    });
    if (!res.ok) return setMsg("Error creating task");
    const newTask = await res.json();
    setTasks((prev) => [newTask, ...prev]); // 🔥 instantly add without reload
    setForm({ title: "", description: "" });
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 space-y-6">
          <Card title="Add New Task">
            <form onSubmit={addTask} className="space-y-3">
              <input
                className="w-full px-3 py-2 border rounded"
                placeholder="Task title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                className="w-full px-3 py-2 border rounded"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Task
              </button>
              {msg && <p className="text-red-500">{msg}</p>}
            </form>
          </Card>

          <Card title="All Tasks">
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li
                  key={t._id}
                  className="flex justify-between bg-gray-100 p-3 rounded hover:bg-gray-200 transition"
                >
                  <div>
                    <h3 className="font-medium">{t.title}</h3>
                    <p className="text-sm text-gray-600">{t.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </main>
      </div>
    </div>
  );
}
