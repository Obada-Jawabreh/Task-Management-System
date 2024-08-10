import { useState, useEffect } from "react";
import axios from "axios";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [taskCard, setTaskCard] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
console.log("oo",tasks);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Pending",
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks/task",
        { withCredentials: true }
      );
      setTasks(response.data);
      setTaskCard(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrUpdateTask = async () => {
    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:5000/api/tasks/task/put/${editingTask.id}`,
          {
            title: taskForm.title,
            description: taskForm.description,
            due_date: taskForm.due_date,
            status: taskForm.status,
          },
          { withCredentials: true }
        );

        const updatedTask = { ...editingTask, ...taskForm };
        setTaskCard(
          taskCard.map((task) =>
            task.id === editingTask.id ? updatedTask : task
          )
        );
        setEditingTask(null);
        alert("Task updated successfully");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/tasks/task",
          {
            title: taskForm.title,
            description: taskForm.description || null,
            due_date: taskForm.due_date || null,
            status: taskForm.status || "Pending",
          },
          { withCredentials: true }
        );
        fetchTasks();
        alert("Task created successfully");
      }

      setTaskForm({
        title: "",
        description: "",
        due_date: "",
        status: "Pending",
      });
    } catch (error) {
      alert("Failed to save task!");
      console.error("Error saving task:", error.response?.data);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
    });
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/task/del/${id}`,
        { is_deleted: true },
        { withCredentials: true }
      );

      setTaskCard(taskCard.filter((task) => task.id !== id));
      console.log("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error.response?.data);
      alert("Failed to delete task!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8">
      {/* Task Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium text-gray-700">
              Task Title
            </label>
            <input
              id="title"
              name="title"
              value={taskForm.title}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={taskForm.description}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="due_date"
              className="block font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              id="due_date"
              name="due_date"
              type="date"
              value={taskForm.due_date}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="block font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={taskForm.status}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCreateOrUpdateTask}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(
          (task) =>
            !task.is_deleted && (
              <div key={task.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">{task.title}</h3>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">{task.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "Pending"
                          ? "bg-gray-200 text-gray-800"
                          : task.status === "In Progress"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
