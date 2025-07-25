# 🛡️ HoneyPot SIEM Dashboard

A complete frontend SIEM (Security Information and Event Management) dashboard built with React and Tailwind CSS that visualizes machine-learning-enhanced honeypot logs with a cybersecurity-inspired dark theme.

## ✨ Features

### 🔐 Core Functionality
- **Real-time Threat Monitoring**: Live dashboard showing active threats and security events
- **ML-Enhanced Detection**: Machine learning predictions classify events as Malicious or Benign
- **Interactive Visualizations**: Charts and graphs showing threat distribution and attack patterns
- **Comprehensive Event Logging**: Detailed tabular view with sorting and filtering capabilities

### 🎨 Visual Design
- **Cybersecurity Dark Theme**: Professional SOC team interface with neon glow effects
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and visual feedback
- **Color-Coded Threats**: Red for malicious, green for benign, blue for informational data

### 📊 Dashboard Components
- **AlertCard**: Real-time threat alerts for malicious activities
- **ThreatChart**: Pie charts and bar graphs showing threat distribution
- **LogTable**: Sortable, filterable table of all honeypot events
- **Quick Stats**: Overview metrics and system status indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Dashboard**
   Navigate to `http://localhost:5173` in your browser

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AlertCard.jsx      # Malicious threat alerts
│   ├── ThreatChart.jsx    # Data visualization charts
│   └── LogTable.jsx       # Event log table
├── data/
│   └── dummyLogs.js       # Mock honeypot dataset
├── App.jsx                # Main dashboard layout
└── main.jsx               # React entry point
```

## 📊 Data Format

Each honeypot log entry contains:

```javascript
{
  id: 1,
  ipAddress: "192.168.1.115",
  port: 22,
  attackType: "SSH Brute Force", 
  mlPrediction: "Malicious",
  timestamp: "2025-01-25T10:30:15Z"
}
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom cybersecurity theme
- **Charts**: Chart.js with react-chartjs-2
- **Build Tool**: Vite for fast development and building
- **Linting**: ESLint for code quality

## 🎯 Color Scheme

- **Background**: `bg-slate-900` (#0f172a)
- **Panels**: `bg-slate-800` with `border-slate-700`
- **Text**: `text-slate-200`
- **Malicious**: `text-rose-500` (#f43f5e) with red glow
- **Benign**: `text-green-500` (#22c55e) 
- **Information**: `text-sky-400` (#38bdf8)
- **Rare/Anomaly**: `text-purple-400` (#8b5cf6) with purple glow

## 🔮 Future Enhancements

- **Live Data Integration**: Replace dummy data with WebSocket/API connections
- **Advanced Filtering**: Geographic IP filtering, time-range selection
- **Export Features**: PDF reports, CSV data export
- **Alert System**: Email/SMS notifications for critical threats
- **User Management**: Role-based access control for SOC teams

## 🤝 Contributing

This project is designed to be modular and extensible. The dummy data can easily be replaced with live API endpoints or WebSocket connections for real-time monitoring.

## 📝 License

MIT License - feel free to use this for educational or commercial purposes.

---

**Perfect for**: Security Operations Centers (SOC), Cybersecurity demonstrations, Educational projects, Security research visualization
