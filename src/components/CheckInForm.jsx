import React, { useState } from 'react';

const STATUS_OPTIONS = ['Present', 'Remote', 'Absent'];

export default function CheckInForm({ onAdd }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Present');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 5));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const payload = {
      id: crypto.randomUUID(),
      name: name.trim(),
      status,
      note: note.trim(),
      date,
      time,
      createdAt: new Date().toISOString(),
    };
    onAdd(payload);
    setName('');
    setNote('');
    setStatus('Present');
    setDate(new Date().toISOString().slice(0, 10));
    setTime(new Date().toTimeString().slice(0, 5));
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Employee Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Johnson"
            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional"
            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Record
        </button>
      </div>
    </form>
  );
}
