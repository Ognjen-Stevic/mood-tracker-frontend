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

export default function MoodReport() {
  const [data, setData] = useState([]);
  const URL = "http://localhost:8081/api/report/week";

  const fetchData = async (e) => {
    try {
      const res = await fetch(URL);
      if (res.status === 204) {
        alert("Nema dovoljno podataka za izvestaj.")
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
          <h2 className="text-xl font-semibold">Mood tracker izvestaj</h2>
          <Link to="/" className="mt-2 btn btn-secondary">Pocetna</Link>
        </div>

        <div className="rounded-2xl border p-4">
          <ResponsiveContainer width="100%" height={420}>
            <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip
                formatter={(value) => [typeof value === "number" ? value.toFixed(1) : value, "Raspolozenje"]}
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