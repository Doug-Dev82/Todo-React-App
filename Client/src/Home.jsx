import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import boy from "../icons/boy-avatar.png";
import addyourtask from "../icons/relax.gif";

export default function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [countCompleted, setCountCompleted] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!window.localStorage.getItem("mytoken")) {
      navigate("/");
    }
    fetchData();
    fetchCount();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const {data} = await axios.get("/show", {params: {status: "pending"}});
      if (data.is_success) {
        setTasks(data.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const fetchCount = async () => {
    try {
      const {data} = await axios.get("/count", {params: {status: "completed"}});
      if (data.username) {
        setUsername(data.username);
      }
      setCountCompleted(data.count);
    } catch (error) {
      console.error("Failed to fetch count:", error);
    }
  };

  const handleAddTask = async event => {
    event.preventDefault();
    const task = event.target.task.value;
    const description = event.target.description.value;

    try {
      const {data} = await axios.post("/addtask", {
        taskname: task,
        description,
      });
      if (data.is_success) {
        fetchData();
        fetchCount();
        event.target.reset();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleComplete = async taskname => {
    try {
      await axios.get("/completed", {params: {taskname}});
      fetchData();
      fetchCount();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDelete = async taskname => {
    try {
      await axios.get("/delete", {params: {taskname, status: "pending"}});
      fetchData();
      fetchCount();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <form
            onSubmit={handleAddTask}
            className="flex gap-4"
          >
            <input
              type="text"
              name="task"
              required
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Enter task title"
            />
            <input
              type="text"
              name="description"
              className="flex-2 p-2 border border-gray-300 rounded"
              placeholder="Describe the task"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="col-span-2">
            {tasks.length ? (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded shadow mb-4"
                >
                  <h2 className="text-lg font-semibold">{task.taskname}</h2>
                  <p className="text-gray-700">{task.description}</p>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleComplete(task.taskname)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleDelete(task.taskname)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <img
                  src={addyourtask}
                  alt="Add tasks"
                  className="mx-auto w-32 h-32"
                />
                <h1 className="text-xl text-gray-700">No Pending Tasks</h1>
              </div>
            )}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src={boy}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-center mt-4 font-semibold">{username}</h2>
            <div className="mt-4">
              <div className="text-center text-lg">
                Completed Tasks:{" "}
                <span className="font-semibold">{countCompleted}</span>
              </div>
              <div className="text-center text-lg">
                Pending Tasks:{" "}
                <span className="font-semibold">{tasks.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
