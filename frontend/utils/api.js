import { io } from "socket.io-client";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? window.location.origin.replace("3000", "5000")
    : "");

export async function apiFetch(path, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(API_BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
}

// socket singleton
let socket;
export const getSocket = () => {
  if (!socket) {
    socket = io(API_BASE);
    socket.on("connect", () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?._id) socket.emit("join", user._id);
    });
  }
  return socket;
};
