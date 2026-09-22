import { AlertTriangle, Check, Sparkles, X } from "lucide-react";

export const  Toast=({ toasts, onDismiss })=> {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === "error"
              ? "bg-rose-900/90 border-rose-700 text-white"
              : toast.type === "success"
              ? "bg-emerald-900/90 border-emerald-700 text-white"
              : "bg-slate-900/90 border-slate-700 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" && <Check className="w-5 h-5 text-emerald-400" />}
            {toast.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-400" />}
            {toast.type === "info" && <Sparkles className="w-5 h-5 text-indigo-400" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}