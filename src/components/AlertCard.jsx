import React from 'react';

const AlertCard = ({ log }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-3 hover:bg-slate-700 transition-all duration-300 hover:shadow-glow-red">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Alert Icon */}
          <div className="flex-shrink-0">
            <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Alert Content */}
          <div>
            <h3 className="text-rose-500 font-semibold text-sm">
              🚨 THREAT DETECTED
            </h3>
            <p className="text-slate-200 text-sm font-medium">
              {log.attackType}
            </p>
          </div>
        </div>
        
        {/* Severity Badge */}
        <div className="flex-shrink-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-900 text-rose-200 border border-rose-700">
            HIGH RISK
          </span>
        </div>
      </div>
      
      {/* Alert Details */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-slate-400">Source IP:</span>
          <span className="ml-2 text-sky-400 font-mono">{log.ipAddress}</span>
        </div>
        <div>
          <span className="text-slate-400">Port:</span>
          <span className="ml-2 text-sky-400 font-mono">{log.port}</span>
        </div>
        <div className="col-span-2">
          <span className="text-slate-400">Time:</span>
          <span className="ml-2 text-slate-200 font-mono">
            {new Date(log.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
      
      {/* ML Confidence Indicator */}
      <div className="mt-3 flex items-center">
        <span className="text-slate-400 text-xs mr-2">ML Confidence:</span>
        <div className="flex-1 bg-slate-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-rose-600 to-rose-400 h-2 rounded-full w-[92%]"></div>
        </div>
        <span className="text-rose-400 text-xs ml-2 font-semibold">92%</span>
      </div>
    </div>
  );
};

// Component to render all malicious alerts
const AlertsPanel = ({ maliciousLogs }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-200 flex items-center">
          🛡️ Active Threats
          <span className="ml-2 text-sm bg-rose-900 text-rose-200 px-2 py-1 rounded-full">
            {maliciousLogs.length}
          </span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          <span className="text-rose-400 text-sm font-medium">LIVE</span>
        </div>
      </div>
      
      {maliciousLogs.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-green-500 text-4xl mb-2">✅</div>
          <p className="text-slate-400">No active threats detected</p>
          <p className="text-slate-500 text-sm mt-1">Your network is secure</p>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto space-y-2">
          {maliciousLogs.map(log => (
            <AlertCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
