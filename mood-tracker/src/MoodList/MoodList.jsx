import React, { useEffect, useState } from 'react'
import Card from './Card';
import DateFilter from './DateFilter';
import { Link } from 'react-router-dom'
import { formatDateForInput } from '../Util';

/**
 * DataList component displays a list of mood entries in card format.
 * 
 * This component can be used in two modes:
 * 1. Normal mode: shows all mood entries with the ability to filter by date, delete entries, and toggle favorites.
 * 2. Favorites mode: shows only favorite mood entries (filter and delete disabled).
 * 
 * Features:
 * - Fetch all mood entries on mount
 * - Delete a mood entry
 * - Filter entries by date
 * - Mark/unmark entries as favorite
 * - Display a placeholder when no entries are available
 * 
 * Props:
 * @param {boolean} isFavoritesPage - Determines if the component should display only favorites. Default is false.
 * 
 * Child components:
 * - Card: displays individual mood entry
 * - DateFilter: allows user to filter entries by date
 */

export default function DataList({ isFavoritesPage = false }) {
  const [data, setData] = useState([]);
  const [filterDate, setFilterDate] = useState(() => formatDateForInput());

  // Function used to delete mood data
  const deleteHandler = async (id) => {
    try {
      await fetch("http://localhost:8081/api/mood", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id)
      });
  
      setData(prevData => prevData.filter(item => item.id !== id));
      alert("The data was deleted successfully.");
    } catch (err) {
      console.error("fetch error: ", err);
      throw err;
    }
  };

  // Function used to handle filter
  const filterHandler = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateFilter: filterDate })
      });

      if (!res.ok) {
        if (res.status === 404) {
          alert("No data for the date: " + filterDate)
          return
        }
        else
          throw new Error(`HTTP ${res.status} ${res.statusText}`)
      }
  
      const data = await res.json();
      console.log(data)
      setData(data)
    } catch (err) {
      console.error("fetch error: ", err)
      throw err;
    }
  };

  // Function used to add/remove mood from favorites
  const handleFavorite = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/favorite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
      })
  
      setData(prev =>
        prev.map(item =>
          item.id === id ? { ...item, favorite: !item.favorite } : item
        )
      )
    } catch (err) {
      console.error("fetch error: ", err)
      throw err;
    }
  };

  // Function used to get all moods
  const getAllData = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/mood", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      setData(data)
    } catch (err) {
      console.error("fetch error: ", err)
      throw err;
    }
  };

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      {/* The filter isn't needed when only favorites are displayed */}
      {!isFavoritesPage && (
        <DateFilter
          setDate={setFilterDate}
          handler={filterHandler}
          value={filterDate}
        />
      )}
  
      <div className="min-vh-100 bg-light py-4">
        <div className="container">
          <Link to="/" className="btn btn-secondary mb-3">Home</Link>
  
          <h1 className="h4 fw-semibold mb-4">
            {isFavoritesPage ? "Favorites:" : "Mood List:"}
          </h1>
  
          {/* Show placeholder when there's no data */}
          {data.length === 0 ? (
            <div className="d-flex flex-column align-items-center mt-5">
              <span style={{ fontSize: '4rem' }}>📭</span>
              <p className="mt-3 text-muted fs-5">No data to display.</p>
              <p className="text-center text-muted">
                Try adding a new mood or changing the filter.
              </p>
            </div>
          ) : {/* Display data */}(
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {(isFavoritesPage ? data.filter(d => d.favorite) : data).map(d => (
                <div className="col" key={d.id}>
                  <Card
                    data={d}
                    onDelete={isFavoritesPage ? null : () => deleteHandler(d.id)}
                    favoriteHandler={handleFavorite}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
