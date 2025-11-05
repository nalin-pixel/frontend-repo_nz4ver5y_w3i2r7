import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import CheckInForm from './components/CheckInForm';
import AttendanceTable from './components/AttendanceTable';
import StatsSummary from './components/StatsSummary';

export default function App() {
  const [records, setRecords] = useState(() => [
    { id: crypto.randomUUID(), name: 'Alex Johnson', status: 'Present', note: 'Onsite', date: new Date().toISOString().slice(0,10), time: '09:05', createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: 'Priya Singh', status: 'Remote', note: 'WFH', date: new Date().toISOString().slice(0,10), time: '09:15', createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: 'Liam Chen', status: 'Absent', note: 'Sick leave', date: new Date().toISOString().slice(0,10), time: '00:00', createdAt: new Date().toISOString() },
  ]);

  const handleAdd = (payload) => setRecords((prev) => [payload, ...prev]);
  const handleDelete = (id) => setRecords((prev) => prev.filter((r) => r.id !== id));

  const todayRecords = useMemo(() => {
    const today = new Date().toISOString().slice(0,10);
    return records.filter((r) => r.date === today);
  }, [records]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <StatsSummary data={records} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CheckInForm onAdd={handleAdd} />
            <div className="mt-6 rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-sky-50 p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Today at a glance</h3>
              <div className="text-sm text-slate-700 space-y-1">
                <p>Records today: <span className="font-medium">{todayRecords.length}</span></p>
                <p>Present/Remote: <span className="font-medium">{todayRecords.filter(r => r.status !== 'Absent').length}</span></p>
                <p>Absent: <span className="font-medium">{todayRecords.filter(r => r.status === 'Absent').length}</span></p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <AttendanceTable rows={records} onDelete={handleDelete} />
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-slate-500">
        Built for quick, friendly attendance tracking
      </footer>
    </div>
  );
}
