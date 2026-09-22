import { Calendar, CheckCheck, CheckCircle2, Circle, Clock, Copy, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { PRIORITY_CONFIG, STATUS_CONFIG } from "../utils/contants";

export const TaskItem=({ task, onToggleStatus, onDelete, onEdit, onDuplicate, onViewMode }) =>{
  const [isExpanded, setIsExpanded] = useState(false);

  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 hover:shadow-md ${
        task.status === "completed"
          ? "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 opacity-80"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Status Checkbox */}
          <button
            onClick={() => onToggleStatus(task.id)}
            className={`mt-0.5 flex-shrink-0 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full`}
            title={task.status === "completed" ? "Mark as in progress" : "Mark as completed"}
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950/50" />
            ) : task.status === "in_progress" ? (
              <Clock className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
            ) : (
              <Circle className="w-6 h-6 text-slate-400 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400" />
            )}
          </button>

          {/* Core Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${PRIORITY_CONFIG[task.priority].color}`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${PRIORITY_CONFIG[task.priority].dot}`}></span>
                  {PRIORITY_CONFIG[task.priority].label}
                </span>

                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {task.category}
                </span>

                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_CONFIG[task.status].badge}`}>
                  {STATUS_CONFIG[task.status].label}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Edit task"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDuplicate(task)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Duplicate task"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Task Title */}
            <h3
              className={`text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                task.status === "completed" ? "line-through text-slate-400 dark:text-slate-500" : ""
              }`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {task.title}
            </h3>

            {/* Task Description */}
            {task.description && (
              <p className={`mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 ${isExpanded ? "line-clamp-none" : ""}`}>
                {task.description}
              </p>
            )}

            {/* Footer Metadata */}
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
              {task.dueDate && (
                <div className={`flex items-center gap-1.5 font-medium ${isOverdue ? "text-rose-600 dark:text-rose-400" : ""}`}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isOverdue ? `Overdue (${task.dueDate})` : `Due ${task.dueDate}`}</span>
                </div>
              )}

              {totalSubtasks > 0 && (
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>
                    {completedSubtasks}/{totalSubtasks} subtasks
                  </span>
                </div>
              )}
            </div>

            {/* Subtasks Expandable List */}
            {totalSubtasks > 0 && isExpanded && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Checklist</p>
                {task.subtasks.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${sub.completed ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"}`} />
                    <span className={sub.completed ? "line-through text-slate-400" : ""}>{sub.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}