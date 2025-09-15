import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home/Home'
import UnosRaspolozenja from './UnosRaspolozenja/UnosRaspolozenja'
import Prikaz from './Prikaz/Prikaz'
import Izvestaj from './Izvestaj/Izvestaj'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route Route path="/" element={<Home />} />
      <Route Route path="/unos-raspolozenja" element={<UnosRaspolozenja />} />
      <Route Route path="/prikaz" element={<Prikaz isFavoritesPage={false} />} />
      <Route Route path="/izvestaj" element={<Izvestaj />} />
      <Route Route path="/omiljeni" element={<Prikaz isFavoritesPage={true} />} />
      <Route Route path="/izmena" element={<UnosRaspolozenja />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
