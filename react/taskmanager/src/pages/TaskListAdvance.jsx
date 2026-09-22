// import React, { useEffect, useState } from "react";

// export default function TaskList({ tasks }) {
//   console.log(tasks);

//   return (
//     <ul className="text-black">
//       Tasks
//       {tasks.length > 0 ? (
//         tasks?.map((task) => (
//           <li key={task.id}>
//             <h3>{task.task}</h3>
//             <h3>{task.title}</h3>
//             <h3>{task.description}</h3>
//           </li>
//         ))
//       ) : (
//         <p>No Tasks</p>
//       )}
//     </ul>
//   );
// }




import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  CheckCircle2,

  Plus,
 
  Search,

  AlertCircle,

  LayoutGrid,
  List,

  X,
  Clock,
  ArrowUpDown,

  Moon,
  Sun,

  Layers,
  Inbox,
  
} from "lucide-react";
import { CATEGORIES, STATUS_CONFIG } from "../utils/contants";
import { TaskItem } from "../components/TaskItem";
import { Toast } from "../components/Toast";
import { TaskModal } from "../components/TaskModel";

export default function TaskList({ tasks: initialPropsTasks }) {
  // Main local state for tasks, allowing standalone demo or prop syncing
  const [tasks, setTasks] = useState(() => initialPropsTasks );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'todo', 'in_progress', 'completed'
  const [priorityFilter, setPriorityFilter] = useState("all"); // 'all', 'high', 'medium', 'low'
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate"); // 'dueDate', 'priority', 'title', 'createdAt'
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'kanban'
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync if props update
  useEffect(() => {
    if (initialPropsTasks && initialPropsTasks.length > 0) {
      setTasks(initialPropsTasks);
    }
  }, [initialPropsTasks]);

  // Dark mode toggler class sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handlers for Task CRUD
  const handleToggleStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus =
            t.status === "completed" ? "todo" : t.status === "todo" ? "in_progress" : "completed";
          addToast(`Task marked as ${STATUS_CONFIG[nextStatus].label}`, "success");
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    addToast("Task deleted successfully", "error");
  };

  const handleDuplicateTask = (task) => {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
      title: `${task.title} (Copy)`,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    addToast("Task duplicated", "info");
  };

  const handleSaveTask = (savedTask) => {
    if (tasks.some((t) => t.id === savedTask.id)) {
      setTasks(tasks.map((t) => (t.id === savedTask.id ? savedTask : t)));
      addToast("Task updated", "success");
    } else {
      setTasks([savedTask, ...tasks]);
      addToast("Task created successfully", "success");
    }
  };

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };


  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || task.status === statusFilter;
        const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
        const matchesCategory = categoryFilter === "All" || task.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "dueDate") {
          return new Date(a.dueDate || "9999-12-31") - new Date(b.dueDate || "9999-12-31");
        }
        if (sortBy === "priority") {
          const weights = { high: 3, medium: 2, low: 1 };
          return weights[b.priority] - weights[a.priority];
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "createdAt") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

  // Analytics stats computation
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const highPriority = tasks.filter((t) => t.priority === "high" && t.status !== "completed").length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, highPriority, completionRate };
  }, [tasks]);
  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50/70 text-slate-800"} font-sans transition-colors duration-300 p-4 sm:p-8`}>
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/30">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  TaskFlow Workspace
                </h1>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Manage tasks, assign priorities, and track progress effortlessly
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </header>

        {/* Analytics & Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Tasks</span>
              <Inbox className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</div>
            <p className="text-xs text-slate-400 mt-1">Across all categories</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.completed}</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
              <Clock className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.inProgress}</div>
            <p className="text-xs text-slate-400 mt-1">Active items</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">High Priority</span>
              <AlertCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{stats.highPriority}</div>
            <p className="text-xs text-slate-400 mt-1">Needs urgent attention</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Switcher & Sort Options */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none font-semibold text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                  <option value="createdAt">Date Created</option>
                </select>
              </div>

              {/* Layout Mode Switcher */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "kanban"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="Kanban Board View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-1">Filter:</span>
            
            {/* Status pills */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {["all", "todo", "in_progress", "completed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all font-medium ${
                    statusFilter === st
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {st === "all" ? "All Status" : st.replace("_", " ")}
                </button>
              ))}
            </div>

            {/* Priority Filter Dropdown */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-xl border transition-all font-medium ${
                    categoryFilter === cat
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No tasks found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6">
              There are no tasks matching your current search or filter criteria. Try adjusting your filters or create a new task.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-md hover:bg-indigo-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        ) : viewMode === "list" ? (
          /* List View */
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTask}
                onEdit={handleOpenEditModal}
                onDuplicate={handleDuplicateTask}
              />
            ))}
          </div>
        ) : (
          /* Kanban Board View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["todo", "in_progress", "completed"].map((statusKey) => {
              const statusTasks = filteredTasks.filter((t) => t.status === statusKey);
              return (
                <div key={statusKey} className="flex flex-col rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-4 min-h-[400px]">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${statusKey === "completed" ? "bg-emerald-500" : statusKey === "in_progress" ? "bg-indigo-500" : "bg-slate-400"}`} />
                      <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 capitalize">
                        {statusKey.replace("_", " ")}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {statusTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {statusTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeleteTask}
                        onEdit={handleOpenEditModal}
                        onDuplicate={handleDuplicateTask}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Window for Add/Edit */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          taskToEdit={taskToEdit}
        />

        {/* Toast Alerts System */}
        <Toast toasts={toasts} onDismiss={removeToast} />
      </div>
    </div>
  );
}