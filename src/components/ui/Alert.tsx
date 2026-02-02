"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

interface AlertProps {
  type: "success" | "error";
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Alert({ type, message, isVisible, onClose }: AlertProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          className="fixed top-6 right-6 z-50 flex overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 min-w-[320px]"
        >
          {/* Colored Strip */}
          <div className={`w-2 ${type === "success" ? "bg-emerald-500" : "bg-rose-500"}`} />
          
          <div className="flex flex-1 items-start gap-3 p-4">
            <div className={`mt-0.5 rounded-full p-1 ${type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
              {type === "success" ? (
                <CheckCircle size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">
                {type === "success" ? "Success" : "Error"}
              </h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mt-0.5">
                {message}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg p-1 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
