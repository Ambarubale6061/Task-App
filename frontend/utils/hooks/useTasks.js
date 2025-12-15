import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery(["tasks"], () => api.get("/tasks"));

  const updateTask = useMutation(
    (task) => api.put(`/tasks/${task._id}`, task),
    {
      onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    }
  );

  return { tasks, updateTask };
};
