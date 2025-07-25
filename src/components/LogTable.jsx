import React, { useState } from 'react';

const LogTable = ({ logs }) => {
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');

  // Filter logs based on prediction
  const filteredLogs = logs.filter(log => {
    if (filterBy === 'all') return true;
    return log.mlPrediction.toLowerCase() === filterBy;
  });

  // Sort logs
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === 'timestamp') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'asc' ? '⬆️' : '⬇️';
  };

  const getPredictionStyle = (prediction) => {
    return prediction === 'Malicious' 
      ? 'text-rose-400 bg-rose-900/30 border-rose-700/50' 
      : 'text-green-400 bg-green-900/30 border-green-700/50';
  };

  const getAttackTypeStyle = (attackType, prediction) => {
    if (prediction === 'Malicious') {
      return 'text-rose-300 font-semibold';
    }
    return 'text-sky-300';
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-200 flex items-center">
            📋 Event Log Analysis
            <span className="ml-2 text-sm bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
              {filteredLogs.length} events
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-time honeypot activity monitoring
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center space-x-3">
          <label className="text-slate-400 text-sm">Filter:</label>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-slate-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Events</option>
            <option value="malicious">Malicious Only</option>
            <option value="benign">Benign Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-700">
              <tr>
                <th 
                  className="text-left p-3 text-slate-300 font-semibold cursor-pointer hover:text-sky-400 transition-colors"
                  onClick={() => handleSort('id')}
                >
                  ID {getSortIcon('id')}
                </th>
                <th 
                  className="text-left p-3 text-slate-300 font-semibold cursor-pointer hover:text-sky-400 transition-colors"
                  onClick={() => handleSort('ipAddress')}
                >
                  IP Address {getSortIcon('ipAddress')}
                </th>
                <th 
                  className="text-left p-3 text-slate-300 font-semibold cursor-pointer hover:text-sky-400 transition-colors"
                  onClick={() => handleSort('port')}
                >
                  Port {getSortIcon('port')}
                </th>
                <th 
                  className="text-left p-3 text-slate-300 font-semibold cursor-pointer hover:text-sky-400 transition-colors"
                  onClick={() => handleSort('attackType')}
                >
                  Attack Type {getSortIcon('attackType')}
                </th>
                <th 
                  className="text-left p-3 text-slate-300 font-semibold cursor-pointer hover:text-sky-400 transition-colors"
                  onClick={() => handleSort('mlPrediction')}
                >
                  ML Prediction {getSortIcon('mlPrediction')}
                </th>
                <th 
                  className="text-left p-3 text-slate-300 font-semibold cursor-pointer hover:text-sky-400 transition-colors"
                  onClick={() => handleSort('timestamp')}
                >
                  Timestamp {getSortIcon('timestamp')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((log, index) => (
                <tr 
                  key={log.id}
                  className={`
                    border-b border-slate-700 hover:bg-slate-700/50 transition-all duration-200
                    ${index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}
                    ${log.mlPrediction === 'Malicious' ? 'hover:shadow-glow-red' : ''}
                  `}
                >
                  <td className="p-3">
                    <span className="text-slate-400 font-mono">
                      #{log.id.toString().padStart(3, '0')}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-sky-400 font-mono bg-slate-900/50 px-2 py-1 rounded">
                      {log.ipAddress}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-purple-400 font-mono">
                      {log.port}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={getAttackTypeStyle(log.attackType, log.mlPrediction)}>
                      {log.attackType}
                    </span>
                  </td>
                  <td className="p-3">
                    <span 
                      className={`
                        px-2 py-1 rounded-full text-xs font-semibold border
                        ${getPredictionStyle(log.mlPrediction)}
                      `}
                    >
                      {log.mlPrediction === 'Malicious' ? '🚨' : '✅'} {log.mlPrediction}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-slate-300">
                      <div className="font-mono text-xs">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </div>
                      <div className="font-mono text-xs text-slate-500">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing {filteredLogs.length} of {logs.length} events
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-rose-500 rounded-full mr-1"></div>
            Malicious: {logs.filter(l => l.mlPrediction === 'Malicious').length}
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            Benign: {logs.filter(l => l.mlPrediction === 'Benign').length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogTable;
