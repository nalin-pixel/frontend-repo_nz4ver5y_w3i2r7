import React, { useMemo, useState } from 'react';
import { Search, XCircle, CheckCircle, Calendar } from 'lucide-react';

const statusBadge = (status) => {
  const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium';
  if (status === 'Present') return <span className={`${base} bg-emerald-50 text-emerald-700`}><CheckCircle className="h-3 w-3"/>Present</span>;
  if (status === 'Remote') return <span className={`${base} bg-indigo-50 text-indigo-700`}><Calendar className="h-3 w-3"/>Remote</span>;
  return <span className={`${base} bg-rose-50 text-rose-700`}><XCircle className="h-3 w-3"/>Absent</span>;
};

export default function AttendanceTable({ rows, onDelete }) {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  const filtered = useMemo(() => {
    let data = rows;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      data = data.filter((r) => r.name.toLowerCase().includes(q) || r.note.toLowerCase().includes(q));
    }
    if (date) {
      data = data.filter((r) => r.date === date);
    }
    const sorted = [...data].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'name') return a.name.localeCompare(b.name) * dir;
      const aDate = new Date(`${a.date}T${a.time}:00`);
      const bDate = new Date(`${b.date}T${b.time}:00`);
      return (aDate - bDate) * dir;
    });
    return sorted;
  }, [rows, query, date, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between p-4 border-b border-slate-200">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or note..."
            className="w-full pl-9 rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {date && (
            <button
              onClick={() => setDate('')}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left font-medium px-4 py-2 cursor-pointer" onClick={() => toggleSort('date')}>
                Date/Time {sortKey === 'date' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left font-medium px-4 py-2 cursor-pointer" onClick={() => toggleSort('name')}>
                Name {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left font-medium px-4 py-2">Status</th>
              <th className="text-left font-medium px-4 py-2">Note</th>
              <th className="text-right font-medium px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">No records found</td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-4 py-2 text-slate-700">
                    <div className="font-medium">{r.date}</div>
                    <div className="text-xs text-slate-500">{r.time}</div>
                  </td>
                  <td className="px-4 py-2 text-slate-700">{r.name}</td>
                  <td className="px-4 py-2">{statusBadge(r.status)}</td>
                  <td className="px-4 py-2 text-slate-600">{r.note || '-'}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => onDelete(r.id)}
                      className="text-sm text-rose-600 hover:text-rose-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
