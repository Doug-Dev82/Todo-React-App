import { useEffect, useState } from "react";
import axios from "../axios"; // Ensure this is correctly configured to handle API requests

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from your backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle adding a new task
  const handleAddTask = async e => {
    e.preventDefault();
    if (!newTask) return;
    try {
      const response = await axios.post("/tasks", {taskName: newTask});
      setTasks([...tasks, response.data]); // Assuming the API returns the added task
      setNewTask(""); // Clear the input after adding
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle removing a task
  const handleRemoveTask = async id => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4">Todo List</h1>
      <form
        onSubmit={handleAddTask}
        className="mb-4"
      >
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Add a new task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
      <ul className="list-disc">
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded my-2"
          >
            <span>{task.taskName}</span>
            <button
              onClick={() => handleRemoveTask(task.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
