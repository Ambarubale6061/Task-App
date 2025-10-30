// Author: Ambar Ubale (Professional Enhanced Dashboard)
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  const chartData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-1">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's your task progress overview ✨
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Total Tasks",
              value: total,
              color: "from-blue-500 to-indigo-500",
            },
            {
              title: "Completed",
              value: completed,
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Pending",
              value: pending,
              color: "from-yellow-400 to-orange-400",
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-2xl shadow-lg transform transition-all duration-300`}
            >
              <h2 className="font-medium text-lg">{card.title}</h2>
              <p className="text-4xl font-bold mt-3">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Task Completion Overview
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
