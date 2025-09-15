import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const buttonClass = "btn btn-primary btn-lg py-3 px-4 w-100";

  const randomAdviseHandler = async () => {
    const res = await fetch("http://localhost:8081/api/advice/random", {
      method: "GET"
    });
    const data = await res.json();
    alert("Savet: "+data.advice)
  };

  return (
    <>
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
        <div className="d-grid gap-3 card shadow p-4 fs-5" style={{ maxWidth: 420 }}>
          <h1>Mood tracker</h1>
          <Link to="/unos-raspolozenja" className={buttonClass}>Unos raspolozenja</Link>
          <Link to="/prikaz" className={buttonClass}>Istorija</Link>
          <Link to="/izvestaj" className={buttonClass}>Izvestaj</Link>
          <Link to="/omiljeni" className={buttonClass}>Omiljeni</Link>
          <button
            className={buttonClass}
            onClick={() => randomAdviseHandler()}>
            Random savet
          </button>
        </div>
      </div>
    </>
  );
}
