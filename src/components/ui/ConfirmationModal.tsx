"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full flex-shrink-0 ${isDestructive ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {message}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-4 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition-all active:scale-95 ${
                  isDestructive 
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-100' 
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
