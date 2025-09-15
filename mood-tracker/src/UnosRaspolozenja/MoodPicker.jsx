import React, { useState } from 'react'

export default function MoodPicker({ initial = 3, onChange }) {
  const [mood, setMood] = useState(initial);
  const MOOD_OPTIONS = [
    { value: 1, emoji: "😞" },
    { value: 2, emoji: "🙁" },
    { value: 3, emoji: "😐" },
    { value: 4, emoji: "🙂" },
    { value: 5, emoji: "🤩" },
  ];

  const handleChange = (e) => {
    const value = Number(e.target.value)
    setMood(value)
    onChange?.(value)
  };

  return (
    <fieldset className="flex items-center" role="radiogroup">
      <legend className="mr-2">Raspolozenje:</legend>

      <div className='d-flex align-items-center'>
      {MOOD_OPTIONS.map((m) => (
        <label key={m.value} className='mx-3'>
          {m.emoji}
          <input
          type='radio'
          name='mood'
          checked={initial === m.value}
          onChange={handleChange}
          className="peer sr-only"
          value={m.value} />
        </label>
      ))}
      </div>
    </fieldset>
  );
}
