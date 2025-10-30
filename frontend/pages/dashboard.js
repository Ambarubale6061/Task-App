// Author: Ambar Ubale
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  async function loadStats() {
    const res = await fetch("http://localhost:5000/api/v1/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    loadStats();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-semibold mb-6 text-blue-700">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border-t-4 border-blue-500">
            <h2 className="font-bold text-lg text-blue-600">Total Tasks</h2>
            <p className="text-3xl mt-3 font-semibold">{total}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border-t-4 border-green-500">
            <h2 className="font-bold text-lg text-green-600">Completed</h2>
            <p className="text-3xl mt-3 font-semibold">{completed}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border-t-4 border-yellow-500">
            <h2 className="font-bold text-lg text-yellow-600">Pending</h2>
            <p className="text-3xl mt-3 font-semibold">{pending}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
