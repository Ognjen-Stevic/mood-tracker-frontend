import React, { useEffect } from 'react'
import MoodPicker from './MoodPicker';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

/**
 * MoodInput component allows users to create a new mood entry or edit an existing one.
 * 
 * This component handles both normal mode (creating a new entry) and edit mode (updating an existing entry).
 * - In normal mode, the user can select a mood level using the MoodPicker component and add a description.
 *   If the selected mood level is low (<3), it optionally fetches a random advice from the API before saving.
 * - In edit mode, the component fetches existing mood data by ID from the API, pre-fills the form, and allows updating the mood entry.
 * 
 * Features:
 * - MoodPicker component for selecting mood level (1-5)
 * - Text input for mood description
 * - Save button to create or update entry
 * - Cancel button in edit mode to abort changes
 * 
 * API interactions:
 * - GET request to fetch existing mood data by ID (edit mode)
 * - POST request to save a new mood entry (normal mode)
 * - PATCH request to update an existing mood entry (edit mode)
 * - GET request to fetch random advice if mood level is low (normal mode)
 * 
 * React Router integration:
 * - Uses useParams to detect if an 'id' parameter is present (edit mode)
 * - Uses useNavigate to redirect after saving or updating an entry
 * 
 * Props: None (all logic handled internally)
 */

export default function MoodInput() {
  const [moodDescription, setMoodDescription] = useState("");
  const [moodLevel, setMoodLevel] = useState(3);
  const navigate = useNavigate();
  const { id } = useParams();

  // If it's edit mode, program need's to fetch mood data by ID (edit mode)
  useEffect(() => {
    if (id) getMoodById();
  }, []);

  // Function used to get data by ID (edit mode)
  const getMoodById = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/mood/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      setMoodLevel(data.moodLevel)
      setMoodDescription(data.moodDescription)
    } catch (err) {
      console.error("fetch error: ", err)
      throw err;
    }
  };

  // Function used to save NEW data (normal mode)
  const saveMood = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/mood", {
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
      alert("Saved successfully.");
    } catch (err) {
      console.error("fetch error", err);
    }
  };

  // Function used to get a random advice (normal mode)
  const getAdvice = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/advice/random', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()
      alert("Advice: " + data.advice)
    } catch (err) {
      console.error("fetch error: ", err)
      throw err;
    }
  };

  // Function used to save edited mood data (edit mode)
  const updateMood = async () => {
    try {
      await fetch(`http://localhost:8081/api/mood/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moodLevel: moodLevel,
          moodDescription: moodDescription
        })
      });

      alert('Updated successfully.')
      navigate('/list')
    } catch (err) {
      console.error("fetch error: ", err)
      throw err;
    }
  };

  // Function used to find correct function to call (edit vs normal mode) 
  const handleSubmit = (e) => {
    e.preventDefault()

    if (id) updateMood()
    else {
      if (moodLevel < 3) getAdvice()
      saveMood()
    }
  };

  return (
    <>
      <div className='min-vh-100 d-flex align-items-center justify-content-center bg-light p-3'>
        <form onSubmit={handleSubmit} className="card shadow p-4 fs-5" style={{ minWidth: 360 }}>
          <div className="mb-3">
            {/* MoodPicker component receives initial mood and onChange callback */}
            <MoodPicker initial={moodLevel} onChange={setMoodLevel} />
          </div>

          <div className="mb-3">
            <label className='me-3'>Description:</label>
            <input
              type='text'
              name='text'
              placeholder='Enter description here'
              value={moodDescription}
              onChange={(e) => {
                setMoodDescription(e.target.value)
              }} /><br />
          </div>
          <button type='submit' className='mb-2'>Save</button>
          <Link to="/" className="btn btn-secondary">Home</Link>
          {/* Add extra link-button to cancel the transacion (edit mode) */}
          {id ? <Link to="/" className="mt-2 btn btn-danger">Cancel</Link> : null}
        </form>
      </div>
    </>
  );
}
