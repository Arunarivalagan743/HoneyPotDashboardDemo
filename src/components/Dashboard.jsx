import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { dashboardAPI } from '../utils/api';
import AlertsPanel from './AlertCard';
import ThreatChart from './ThreatChart';
import LogTable from './LogTable';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardAPI.getDashboardData();
      setDashboardData(data);
      setError(null);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setError(error.message);
      toast.error('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
    
    // Set up periodic refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Store logs globally for charts to access
  useEffect(() => {
    if (dashboardData?.allLogs) {
      window.allLogs = dashboardData.allLogs;
    }
  }, [dashboardData]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleRefresh = () => {
    fetchDashboardData();
    toast.success('Dashboard refreshed');
  };

  if (isLoading && !dashboardData) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading SIEM Dashboard</h2>
          <p className="text-slate-400">Fetching real-time threat data...</p>
        </div>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-rose-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Dashboard Error</h2>
          <p className="text-slate-400 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const logs = dashboardData?.logs || [];
  const maliciousLogs = dashboardData?.allLogs?.filter(log => log.mlPrediction === 'Malicious') || [];
  const logCounts = {
    malicious: stats.activeThreats || 0,
    benign: stats.benignEvents || 0
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 flex items-center">
                🛡️ HoneyPot SIEM Dashboard
                <span className="ml-3 text-sm bg-gradient-to-r from-sky-500 to-purple-500 text-white px-3 py-1 rounded-full">
                  Live Data
                </span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Welcome back, {user?.email} • Last updated: {new Date(dashboardData?.timestamp).toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <span className={`text-sm ${isLoading ? 'animate-spin' : ''}`}>🔄</span>
                <span className="text-sm">Refresh</span>
              </button>

              {/* Live Status */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium text-sm">LIVE</span>
              </div>
              
              {/* Current Time */}
              <div className="text-slate-300 font-mono text-sm">
                {currentTime.toLocaleString()}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <span>🚪</span>
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Events</p>
                <p className="text-2xl font-bold text-slate-200">{stats.totalAttacks || 0}</p>
              </div>
              <div className="text-sky-400 text-2xl">📊</div>
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Threats</p>
                <p className="text-2xl font-bold text-rose-400">{stats.activeThreats || 0}</p>
              </div>
              <div className="text-rose-400 text-2xl">🚨</div>
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Blocked</p>
                <p className="text-2xl font-bold text-green-400">{stats.blockedAttacks || 0}</p>
              </div>
              <div className="text-green-400 text-2xl">🛡️</div>
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Detection Rate</p>
                <p className="text-2xl font-bold text-purple-400">{stats.detectionRate || 0}%</p>
              </div>
              <div className="text-purple-400 text-2xl">🎯</div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Threat Level</p>
                <p className={`text-xl font-bold ${
                  stats.threatLevel === 'CRITICAL' ? 'text-red-500' :
                  stats.threatLevel === 'HIGH' ? 'text-orange-500' :
                  stats.threatLevel === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {stats.threatLevel || 'LOW'}
                </p>
              </div>
              <div className="text-yellow-400 text-2xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Alerts */}
          <div className="lg:col-span-1">
            <AlertsPanel maliciousLogs={maliciousLogs} />
          </div>
          
          {/* Right Column: Charts */}
          <div className="lg:col-span-2">
            <ThreatChart logCounts={logCounts} />
          </div>
        </div>

        {/* Full Width: Log Table */}
        <div className="mt-6">
          <LogTable logs={logs} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div>
              © 2025 HoneyPot SIEM Dashboard • Authenticated Session
            </div>
            <div className="flex items-center space-x-4">
              <span>Backend: Connected</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
