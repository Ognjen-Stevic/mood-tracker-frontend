import React, { useState } from 'react'

/**
 * MoodPicker component allows users to select their mood using radio buttons with emojis.
 * It accepts an initial mood and provides a callback when the mood is changed.
 *  
 * @param {Object} props - The props for the component.
 * @param {number} [props.initialMood=3] - The initial mood value (1-5). Default is 3 (neutral mood).
 * @param {function} [props.onChange] - Callback function that is called when the mood is changed. Receives the selected mood value.
 *
 */

export default function MoodPicker({ initialMood = 3, onChange }) {
  const [moodLevel, setMoodLevel] = useState(initialMood);
  const MOOD_OPTIONS = [
    { value: 1, emoji: "😞" },
    { value: 2, emoji: "🙁" },
    { value: 3, emoji: "😐" },
    { value: 4, emoji: "🙂" },
    { value: 5, emoji: "🤩" },
  ];

  // Function used to handle change of moodLevel
  const handleChange = (e) => {
    const value = Number(e.target.value)
    setMoodLevel(value)
    onChange?.(value)
  };

  return (
    <fieldset className="flex items-center" role="radiogroup">
      <legend className="mr-2">Mood Level:</legend>

      <div className='d-flex align-items-center'>
      {MOOD_OPTIONS.map((m) => (
        <label key={m.value} className='mx-3'>
          {m.emoji}
          <input
          type='radio'
          name='mood'
          checked={moodLevel === m.value}
          onChange={handleChange}
          className="peer sr-only"
          value={m.value} />
        </label>
      ))}
      </div>
    </fieldset>
  );
}
