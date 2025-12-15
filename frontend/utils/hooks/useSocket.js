import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

const socket = io("http://localhost:5000"); // Update URL if deployed

export const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("taskUpdated", (task) => {
      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((t) => (t._id === task._id ? task : t))
      );
    });

    socket.on("taskAssigned", (task) => {
      alert(`New task assigned: ${task.title}`);
    });

    return () => {
      socket.off("taskUpdated");
      socket.off("taskAssigned");
    };
  }, []);
};
