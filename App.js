import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./App.css"; // ✅ Import fading theme

function App() {
  const roadData = [
    { id: 1, location: "Anna Salai", damage_type: "Pothole", severity: "High", repair_date: "2025-11-03" },
    { id: 2, location: "OMR Road", damage_type: "Crack", severity: "Medium", repair_date: "2025-11-04" },
    { id: 3, location: "Guindy Road", damage_type: "Surface Erosion", severity: "Low", repair_date: "2025-11-06" },
  ];

  const severityCount = [
    { name: "Low", value: roadData.filter((r) => r.severity === "Low").length },
    { name: "Medium", value: roadData.filter((r) => r.severity === "Medium").length },
    { name: "High", value: roadData.filter((r) => r.severity === "High").length },
  ];

  const COLORS = ["#82ca9d", "#ffc658", "#ff4d4d"];

  // === Repair Scheduler Logic ===
  const [scheduled, setScheduled] = useState(roadData);

  const addRepair = () => {
    const newItem = {
      id: scheduled.length + 1,
      location: "New Road - Zone " + (scheduled.length + 1),
      damage_type: ["Pothole", "Crack", "Erosion"][Math.floor(Math.random() * 3)],
      severity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
      repair_date: `2025-11-${Math.floor(Math.random() * 10) + 7}`,
    };
    setScheduled([...scheduled, newItem]);
  };

  return (
    <div className="App">
      <h1>🛣️ RoadXpert</h1>

      {/* === Severity Chart === */}
      <div className="card chart">
        <h2>📊 Severity Distribution</h2>
        <PieChart width={300} height={300}>
          <Pie data={severityCount} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {severityCount.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* === Road Damage Table === */}
      <div className="card">
        <h2>🧾 Road Damage Details</h2>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Repair Date</th>
            </tr>
          </thead>
          <tbody>
            {roadData.map((item) => (
              <tr key={item.id}>
                <td>{item.location}</td>
                <td>{item.damage_type}</td>
                <td
                  className={
                    item.severity === "High"
                      ? "severity-high"
                      : item.severity === "Medium"
                      ? "severity-medium"
                      : "severity-low"
                  }
                >
                  {item.severity}
                </td>
                <td>{item.repair_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Innovative Repair Scheduler === */}
      <div className="card scheduler">
        <h2>🛠️ Smart Repair Scheduler</h2>
        <p className="scheduler-desc">
          Automatically prioritize and schedule road repairs based on severity and traffic impact.
        </p>

        <div className="timeline">
          {scheduled.map((item, index) => (
            <div key={index} className="timeline-item">
              <div
                className={
                  "timeline-dot " +
                  (item.severity === "High"
                    ? "dot-high"
                    : item.severity === "Medium"
                    ? "dot-medium"
                    : "dot-low")
                }
              ></div>
              <div className="timeline-content">
                <h4>{item.location}</h4>
                <p>{item.damage_type}</p>
                <span className="date">🗓️ {item.repair_date}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="add-btn" onClick={addRepair}>
          ➕ Add Scheduled Repair
        </button>
      </div>

      <footer>© 2025 RoadVision AI | Prototype for GUVI × HCL Hackathon</footer>
    </div>
  );
}

export default App;
