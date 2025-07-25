import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ThreatChart = ({ logCounts }) => {
  const { malicious, benign } = logCounts;
  
  // Pie chart data for threat distribution
  const pieData = {
    labels: ['Malicious', 'Benign'],
    datasets: [
      {
        data: [malicious, benign],
        backgroundColor: [
          'rgba(244, 63, 94, 0.8)',  // Rose-500 for malicious
          'rgba(34, 197, 94, 0.8)',  // Green-500 for benign
        ],
        borderColor: [
          'rgba(244, 63, 94, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(244, 63, 94, 0.9)',
          'rgba(34, 197, 94, 0.9)',
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            family: 'system-ui',
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const total = malicious + benign;
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      }
    },
  };

  // Bar chart data for attack types
  const getAttackTypeData = (logs) => {
    const attackTypes = {};
    logs.forEach(log => {
      attackTypes[log.attackType] = (attackTypes[log.attackType] || 0) + 1;
    });
    return attackTypes;
  };

  const attackTypeCounts = getAttackTypeData(window.allLogs || []);
  const attackTypeLabels = Object.keys(attackTypeCounts);
  const attackTypeValues = Object.values(attackTypeCounts);

  const barData = {
    labels: attackTypeLabels,
    datasets: [
      {
        label: 'Attack Frequency',
        data: attackTypeValues,
        backgroundColor: 'rgba(56, 189, 248, 0.8)',
        borderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(56, 189, 248, 0.9)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
          font: {
            size: 10,
          },
          maxRotation: 45,
        },
        grid: {
          color: 'rgba(51, 65, 85, 0.3)',
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(51, 65, 85, 0.3)',
        },
      },
    },
  };

  const threatLevel = malicious > benign ? 'HIGH' : malicious > 0 ? 'MEDIUM' : 'LOW';
  const threatColor = threatLevel === 'HIGH' ? 'text-rose-500' : 
                     threatLevel === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className="space-y-6">
      {/* Threat Distribution Pie Chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-200">
            📊 Threat Distribution
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Threat Level:</span>
            <span className={`font-bold text-sm ${threatColor}`}>
              {threatLevel}
            </span>
          </div>
        </div>
        
        <div className="h-64">
          <Pie data={pieData} options={pieOptions} />
        </div>
        
        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-slate-200">
              {malicious + benign}
            </div>
            <div className="text-slate-400 text-sm">Total Events</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-rose-400">
              {malicious}
            </div>
            <div className="text-slate-400 text-sm">Threats</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-400">
              {benign}
            </div>
            <div className="text-slate-400 text-sm">Benign</div>
          </div>
        </div>
      </div>

      {/* Attack Types Chart */}
      {attackTypeLabels.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-slate-200 mb-4">
            🎯 Attack Vector Analysis
          </h2>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatChart;
