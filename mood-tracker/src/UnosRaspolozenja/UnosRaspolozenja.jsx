import React from 'react'
import MoodPicker from './MoodPicker';
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function UnosRaspolozenja() {
  const { state } = useLocation();
  const data = state?.data ?? null;
  const isEditMode = !!data;
  const navigate = useNavigate();

  const [mood, setMood] = useState(data?.mood ?? 3);
  const [description, setDescription] = useState(data?.desc ?? "");

  const saveMood = async () => {
    console.log(mood)
    console.log(description)
    try {
      const res = await fetch("http://localhost:8081/api/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          moodLevel: mood,
          description: description
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      alert("Uspešno sačuvano!");
    } catch (err) {
      console.error("fetch error", err);
    }
  };

  const getAdvice = async () => {
    const res = await fetch('http://localhost:8081/api/advice/random', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    alert("Savet: " + data.advice)
  };

  const updateMood = async () => {
    await fetch(`http://localhost:8081/api/entry`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.id,
        moodLevel: mood,
        description: description
      })
    });

    alert('Uspesno je uzurirano.')
    navigate('/prikaz')
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditMode) updateMood()
    else {
      if (mood < 3) getAdvice()
      saveMood()
    }
  };

  return (
    <>
      <div className='min-vh-100 d-flex align-items-center justify-content-center bg-light p-3'>
        <form onSubmit={handleSubmit} className="card shadow p-4 fs-5" style={{ minWidth: 360 }}>
          <div className="mb-3">
            <MoodPicker initial={mood} onChange={setMood} />
          </div>

          <div className="mb-3">
            <label className='me-3'>Opis:</label>
            <input
              type='text'
              name='text'
              placeholder='Unesite opis ovde'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }} /><br />
          </div>
          <button type='submit' className='mb-2'>Sacuvaj</button>
          <Link to="/" className="btn btn-secondary">Pocetna</Link>
          {isEditMode ? <Link to="/" className="mt-2 btn btn-danger">Odustani</Link> : null}
        </form>
      </div>
    </>
  );
}
