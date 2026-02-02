import { MOCK_ACTIVITIES } from "@/constants/mock-data";
import { 
  CheckCircle, 
  ArrowRightCircle, 
  AlertCircle, 
  RefreshCw 
} from "lucide-react";

export default function LogsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'rental_start': return <ArrowRightCircle className="text-indigo-500" size={20} />;
      case 'rental_end': return <CheckCircle className="text-emerald-500" size={20} />;
      case 'maintenance_flag': return <AlertCircle className="text-rose-500" size={20} />;
      default: return <RefreshCw className="text-slate-500" size={20} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Audit Trail</p>
        <h2 className="text-3xl font-bold text-slate-900">Activity Logs</h2>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ACTIVITIES.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        {getIcon(activity.type)}
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {activity.type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600">{activity.vehicleName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{activity.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-500">
                      {new Date(activity.timestamp).toLocaleString([], { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
