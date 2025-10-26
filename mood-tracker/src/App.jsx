import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home/Home'
import MoodInput from './MoodInput/MoodInput'
import MoodList from './MoodList/MoodList'
import Report from './Report/Report'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route Route path="/" element={<Home />} />
      <Route Route path="/mood-input" element={<MoodInput />} />
      <Route Route path="/list" element={<MoodList isFavoritesPage={false} />} />
      <Route Route path="/report" element={<Report />} />
      <Route Route path="/favorites" element={<MoodList isFavoritesPage={true} />} />
      <Route Route path="/edit/:id" element={<MoodInput />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
