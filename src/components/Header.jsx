import React from 'react';
import { User, Calendar } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold">AS</div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Attendance System</h1>
            <p className="text-xs text-slate-500">Track check-ins, status, and insights</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="mx-2 h-4 w-px bg-slate-300" />
          <User className="h-4 w-4" />
          <span className="text-sm">Admin</span>
        </div>
      </div>
    </header>
  );
}
