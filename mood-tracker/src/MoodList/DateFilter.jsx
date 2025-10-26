import React from 'react'

/**
 * DateFilter component provides a simple UI to select a date and trigger a filtering action.
 * 
 * Props:
 * @param {string} value - The current selected date in "YYYY-MM-DD" format.
 * @param {function} setDate - Callback function to update the selected date state.
 * @param {function} handler - Callback function to execute when the "Find" button is clicked.
 */

export default function DateFilter({ value, setDate, handler }) {

  return (
    <>
    <div className="container my-3">
    <label className="form-label d-block fw-semibold mb-2">Choose date:</label>
    <div className="d-flex gap-2">
      <input
        type="date"
        className="form-control"
        value={value}
        onChange={(e) => { setDate(e.target.value) }}
      />
      <button className="btn btn-primary" onClick={handler}>Find</button>
    </div>
    </div>
    </>
  )
}
