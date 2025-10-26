import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/**
 * MoodReport component fetches and displays the average mood levels for the last 7 days in a line chart.
 * 
 * Features:
 * - Fetches weekly mood report data from the API.
 * - Converts the report data into chart-friendly format.
 * - Displays a responsive line chart using Recharts.
 * - Shows X-axis with day labels and Y-axis with mood levels (1-5).
 * - Tooltip displays the mood value for each day.
 * - Alerts the user if there is not enough data to generate a report.
 * - Includes a navigation button back to the home page.
 * 
 * Notes:
 * - Uses the Recharts library for chart rendering.
 * - Data is reversed so that the oldest day appears first on the chart.
 */

export default function MoodReport() {
  const [data, setData] = useState([]);

  // Function used to get average mood level for last 7 days, if 1 day is off the graph won't show data
  const fetchData = async () => {
    try {
      const res = await fetch("/api/report/week");
      if (res.status === 204) {
        alert("There is not enough data.")
        setData([])
        return
      }
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)

      const body = await res.json();
      const chartData = Object.entries(body.reportMap ?? {})
        .map(([label, mood]) => ({
          label,
          mood: Number(mood)
        })).reverse()

      setData(chartData)
      return data;
    } catch (err) {
      console.error("fetch error: ", err);
      throw err;
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2 className="text-xl font-semibold">Mood Tracker Graph</h2>
          <Link to="/" className="mt-2 btn btn-secondary">Home</Link>
        </div>

        <div className="rounded-2xl border p-4">
          <ResponsiveContainer width="100%" height={420}>
            <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip
                formatter={(value) => [typeof value === "number" ? value.toFixed(1) : value, "Mood"]}
                labelFormatter={(lab) => `${lab}`}
              />
              <Line type="monotone" dataKey="mood" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}