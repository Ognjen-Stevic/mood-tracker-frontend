import { Link } from 'react-router-dom'

export default function Card({ data, onDelete, favoriteHandler }) {
  const MOOD_EMOJI = { 1: "😢", 2: "🙁", 3: "😐", 4: "🙂", 5: "😄" };
  const d = data?.date ? new Date(data.date) : null;

  const parts = d
    ? new Intl.DateTimeFormat("sr-Latn-RS", {
      timeZone: "Europe/Belgrade",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(d)
      .reduce((acc, p) => ((acc[p.type] = p.value), acc), {})
    : null;

  const dateStr = parts ? `${parts.month}.${parts.day}.${parts.year}.` : "";
  const timeStr = d
    ? new Intl.DateTimeFormat("sr-Latn-RS", {
      timeZone: "Europe/Belgrade",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d)
    : "";


  return (
    <>
      <div className='bg-white px-3 py-3'>
        <h3>{dateStr}</h3>
        <p className='text-secondary'>{timeStr}</p>
        <p className='text-primary'>{MOOD_EMOJI[data.moodLevel]}</p>
        <p>{data.description === null ? '*no description' : data.description}</p>
        {onDelete && (
          <button
            className='me-2 btn btn-danger'
            onClick={onDelete}>
            Delete</button>
        )}
        <button
          className='me-2 btn btn-warning'
          onClick={() => favoriteHandler(data.id)}
        >
          {data.favorite ? '★' : '☆'}
        </button>
        {onDelete && (
          <Link to="/izmena" className="btn btn-secondary" state={{ data }}>Izmeni</Link>
        )}
      </div>
    </>
  );
}
