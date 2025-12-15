import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Load ReactQuill dynamically for SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState(""); // single editor
  const [msg, setMsg] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API = process.env.NEXT_PUBLIC_API_URL + "/api/v1/tasks";

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const token = localStorage.getItem("token");
    const res = await fetch(API, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setTasks(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content) return setMsg("Task content cannot be empty");

    const token = localStorage.getItem("token");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title: content, description: content }),
    });

    if (!res.ok) return setMsg("Error saving task");

    setContent("");
    setEditingId(null);
    setMsg("");
    fetchTasks();
  }

  function handleEdit(task) {
    setContent(task.title); // load content for editing
    setEditingId(task._id);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this task?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    fetchTasks();
  }

  // Split first line as title, rest as description
  function splitContent(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const lines = div.textContent.split("\n").filter(Boolean);
    return {
      title: lines[0] || "",
      description: lines.slice(1).join("\n") || "",
    };
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 space-y-6">
          <Card title={editingId ? "Edit Task" : "Add New Task"}>
            <form onSubmit={handleSubmit} className="space-y-3">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Enter task title and description"
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
                {editingId ? "Update Task" : "Add Task"}
              </button>
              {msg && <p className="text-red-500 mt-1">{msg}</p>}
            </form>
          </Card>

          <Card title="All Tasks">
            <ul className="space-y-2">
              {tasks.map((t) => {
                const split = splitContent(t.title);
                return (
                  <li
                    key={t._id}
                    className="flex justify-between bg-gray-100 p-3 rounded hover:bg-gray-200 transition"
                  >
                    <div>
                      <h3 className="font-medium">{split.title}</h3>
                      <p className="text-sm text-gray-600">
                        {split.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </main>
      </div>
    </div>
  );
}
