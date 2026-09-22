export const CATEGORIES = ["All", "Engineering", "Design", "Product", "Marketing", "Personal"];

export const PRIORITY_CONFIG = {
  high: { label: "High", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50", dot: "bg-rose-500" },
  medium: { label: "Medium", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50", dot: "bg-amber-500" },
  low: { label: "Low", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50", dot: "bg-emerald-500" },
};

export const STATUS_CONFIG = {
  todo: { label: "To Do", badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  in_progress: { label: "In Progress", badge: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50" },
  completed: { label: "Completed", badge: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400" },
};