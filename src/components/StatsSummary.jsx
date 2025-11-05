import React from 'react';
import { CheckCircle, XCircle, User } from 'lucide-react';

export default function StatsSummary({ data }) {
  const total = data.length;
  const present = data.filter((d) => d.status === 'Present').length;
  const remote = data.filter((d) => d.status === 'Remote').length;
  const absent = data.filter((d) => d.status === 'Absent').length;
  const rate = total ? Math.round(((present + remote) / total) * 100) : 0;

  const card = (
    title,
    value,
    icon,
    color
  ) => (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`h-10 w-10 rounded-lg grid place-items-center ${color}`}>{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
        <p className="text-xl font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {card('Total Records', total, <User className="h-5 w-5 text-slate-700" />, 'bg-slate-100')}
      {card('Present', present, <CheckCircle className="h-5 w-5 text-emerald-600" />, 'bg-emerald-50')}
      {card('Remote', remote, <CheckCircle className="h-5 w-5 text-indigo-600" />, 'bg-indigo-50')}
      {card('Attendance Rate', `${rate}%`, <CheckCircle className="h-5 w-5 text-sky-600" />, 'bg-sky-50')}
    </section>
  );
}
