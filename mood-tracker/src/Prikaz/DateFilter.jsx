import React from 'react'

export default function DateFilter({ value, setDate, handler }) {

  return (
    <>
    <div className="container my-3">
    <label className="form-label d-block fw-semibold mb-2">Odaberi datum:</label>
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
