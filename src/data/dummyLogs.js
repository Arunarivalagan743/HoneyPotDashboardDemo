export const dummyLogs = [
  {
    id: 1,
    ipAddress: "192.168.1.115",
    port: 22,
    attackType: "SSH Brute Force",
    mlPrediction: "Malicious",
    timestamp: "2025-01-25T10:30:15Z"
  },
  {
    id: 2,
    ipAddress: "10.0.0.45",
    port: 80,
    attackType: "HTTP Scan",
    mlPrediction: "Benign",
    timestamp: "2025-01-25T10:31:22Z"
  },
  {
    id: 3,
    ipAddress: "203.0.113.50",
    port: 443,
    attackType: "SQL Injection",
    mlPrediction: "Malicious",
    timestamp: "2025-01-25T10:32:18Z"
  },
  {
    id: 4,
    ipAddress: "172.16.0.88",
    port: 21,
    attackType: "FTP Enumeration",
    mlPrediction: "Malicious",
    timestamp: "2025-01-25T10:33:45Z"
  },
  {
    id: 5,
    ipAddress: "10.0.0.12",
    port: 3389,
    attackType: "RDP Connection",
    mlPrediction: "Benign",
    timestamp: "2025-01-25T10:34:12Z"
  },
  {
    id: 6,
    ipAddress: "198.51.100.77",
    port: 25,
    attackType: "SMTP Relay",
    mlPrediction: "Malicious",
    timestamp: "2025-01-25T10:35:33Z"
  },
  {
    id: 7,
    ipAddress: "192.168.1.200",
    port: 53,
    attackType: "DNS Query",
    mlPrediction: "Benign",
    timestamp: "2025-01-25T10:36:08Z"
  },
  {
    id: 8,
    ipAddress: "185.220.101.23",
    port: 8080,
    attackType: "Web Shell Upload",
    mlPrediction: "Malicious",
    timestamp: "2025-01-25T10:37:55Z"
  },
  {
    id: 9,
    ipAddress: "172.16.0.25",
    port: 445,
    attackType: "SMB Scan",
    mlPrediction: "Benign",
    timestamp: "2025-01-25T10:38:41Z"
  },
  {
    id: 10,
    ipAddress: "203.0.113.199",
    port: 1433,
    attackType: "SQL Server Attack",
    mlPrediction: "Malicious",
    timestamp: "2025-01-25T10:39:27Z"
  },
  {
    id: 11,
    ipAddress: "10.0.0.78",
    port: 3306,
    attackType: "MySQL Access",
    mlPrediction: "Benign",
    timestamp: "2025-01-25T10:40:14Z"
  },
  {
    id: 12,
    ipAddress: "192.168.100.150",
    port: 23,
    attackType: "Telnet Brute Force",
    mlPrediction: "Malicious",
    timestamp: "2025-01-25T10:41:02Z"
  },
  {
    id: 13,
    ipAddress: "172.16.5.44",
    port: 993,
    attackType: "IMAP Access",
    mlPrediction: "Benign",
    timestamp: "2025-01-25T10:42:19Z"
  },
  {
    id: 14,
    ipAddress: "198.51.100.101",
    port: 6379,
    attackType: "Redis Exploit",
    mlPrediction: "Malicious",
    timestamp: "2025-01-25T10:43:38Z"
  },
  {
    id: 15,
    ipAddress: "10.0.0.156",
    port: 5432,
    attackType: "PostgreSQL Query",
    mlPrediction: "Benign",
    timestamp: "2025-01-25T10:44:55Z"
  }
];

// Utility functions for data processing
export const getMaliciousLogs = () => {
  return dummyLogs.filter(log => log.mlPrediction === "Malicious");
};

export const getBenignLogs = () => {
  return dummyLogs.filter(log => log.mlPrediction === "Benign");
};

export const getLogCountByPrediction = () => {
  const malicious = getMaliciousLogs().length;
  const benign = getBenignLogs().length;
  return { malicious, benign };
};
