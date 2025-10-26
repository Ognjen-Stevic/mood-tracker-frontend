import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Home component serves as the main landing page of the Mood Tracker app.
 * 
 * It provides navigation buttons to the key features of the app:
 * - Mood Input: navigate to create a new mood entry
 * - History List: navigate to view all past mood entries
 * - Weekly Report: navigate to view the weekly summary report
 * - Favorites: navigate to view favorite mood entries
 * - Random Advice: fetches a random piece of advice from the API and displays it in an alert
 * 
 * The component uses React Router's Link for navigation and a standard fetch API call for the random advice.
 */

export default function Home() {
  const buttonClass = "btn btn-primary btn-lg py-3 px-4 w-100";

  // Function used to fetch a random advice, used in `Random Advice` button
  const randomAdviseHandler = async () => {
    try {
      const res = await fetch("/api/advice/random", {
        method: "GET"
      })
      const data = await res.json();
      alert("Advise: " + data.advice)
    } catch (err) {
      console.error("fetch error: ", err)
      throw err;
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
        <div className="d-grid gap-3 card shadow p-4 fs-5" style={{ maxWidth: 420 }}>
          <h1>Mood tracker</h1>
          <Link to="/mood-input" className={buttonClass}>Mood Input</Link>
          <Link to="/list" className={buttonClass}>History List</Link>
          <Link to="/report" className={buttonClass}>Weekly Report</Link>
          <Link to="/favorites" className={buttonClass}>Favorites</Link>
          <button
            className={buttonClass}
            onClick={() => randomAdviseHandler()}>
            Random Advice
          </button>
        </div>
      </div>
    </>
  );
}
