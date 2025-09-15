import React, { useEffect, useState } from 'react'
import Card from './Card';
import DateFilter from './DateFilter';
import { Link } from 'react-router-dom'
import { formatDateForInput } from '../Util';

export default function Prikaz({ isFavoritesPage = false }) {
  const [data, setData] = useState([]);
  const [filterDate, setFilterDate] = useState(() => formatDateForInput());

  const deleteHandler = async (id) => {
    setData(prev => prev.filter(item => item.id !== id))

    await fetch("http://localhost:8081/api/entry", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id)
    });

    alert("Podatak je uspesno obrisan")
  };

  const filterHandler = async () => {
    const res = await fetch("http://localhost:8081/api/entry/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dateFilter: filterDate })
    });

    if (res.status === 404) {
      alert("Nema podataka za datum: " + filterDate)
      return
    }

    const data = await res.json();
    console.log(data)
    setData(data)
  };

  const handleFavorite = async (id) => {
    await fetch(`http://localhost:8081/api/entry/favorite`, {
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
  };

  const getAllData = async () => {
    const res = await fetch("http://localhost:8081/api/entry", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setData(data)
  };

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      {isFavoritesPage ? null :
        <DateFilter
          setDate={setFilterDate}
          handler={filterHandler}
          value={filterDate}
        />}

      <div className="min-vh-100 bg-light py-4">
        <div className="container">
          <Link to="/" className="mt-2 btn btn-secondary">Pocetna</Link>
          <h1 className="h4 fw-semibold mb-3">{isFavoritesPage ? "Omiljeni:" : "Istorija unosa:"}</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

            {data.length === 0 ? (
              <div className="col-12 text-center">
                <p>Nema podataka za prikaz.</p>
              </div>
            ) : (isFavoritesPage ? data.filter(d => d.favorite) : data).map((d) => (
              <div className="col" key={d.id}>
                <Card
                  data={d}
                  onDelete={isFavoritesPage ? null : () => deleteHandler(d.id)}
                  favoriteHandler={handleFavorite}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
