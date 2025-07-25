# Copilot Instructions for HoneyPot SIEM Dashboard

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React-based SIEM (Security Information and Event Management) dashboard for visualizing machine-learning-enhanced honeypot logs.

## Technology Stack
- **Frontend**: React with Vite
- **Styling**: Tailwind CSS (dark cybersecurity theme)
- **Charts**: Chart.js with react-chartjs-2
- **Data**: Mock honeypot logs with ML predictions

## Code Style Guidelines
1. Use functional components with React hooks
2. Follow Tailwind CSS utility-first approach
3. Maintain cybersecurity dark theme with these colors:
   - Background: `bg-slate-900` (#0f172a)
   - Panels: `bg-slate-800`
   - Borders: `border-slate-700`
   - Text: `text-slate-200`
   - Malicious threats: `text-rose-500` with red glow effects
   - Benign events: `text-green-500`
   - Information: `text-sky-400`

## Component Structure
- `AlertCard.jsx`: Displays malicious threat alerts
- `ThreatChart.jsx`: Pie and bar charts for threat visualization
- `LogTable.jsx`: Sortable, filterable table of all logs
- `dummyLogs.js`: Mock dataset with honeypot entries

## Data Format
Each log entry contains:
```javascript
{
  id: number,
  ipAddress: string,
  port: number,
  attackType: string,
  mlPrediction: "Malicious" | "Benign",
  timestamp: string (ISO format)
}
```

## Design Principles
- Responsive design for all screen sizes
- Hover effects and subtle animations
- Glow effects for threat indicators
- Professional SOC team interface
- Modular components for easy extension to live data

## Future Extensions
- Replace dummy data with WebSocket/API integration
- Add real-time notifications
- Implement advanced filtering and search
- Add export functionality for reports
