import React, { useState } from 'react';
import { CiHeart, CiCamera, CiSearch, CiCalendar } from "react-icons/ci";
import LongMenu from "./menu";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import AddMemory from "./components/AddMemory";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [openSearch, setopenSearch] = useState(true);
  const [openAddMemory, setOpenAddMemory] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  const togglesearch = () => {
    setopenSearch(!openSearch);
  };


  const searchMemory = (e) => {
    setSearchQuery(e.target.value);

  }

  const handleMemoryAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-head">
          <img src="./album.png" className="logo" alt="logo" />
          <p className="App-title">Memories Book</p>
        </div>
        <div className='d-flex'>
          <div className="search-container1">
            <input type="text" placeholder="Search Memories, tags..." onChange={searchMemory} value={searchQuery} className={openSearch ? 'd-none' : 'search-input1 d-block'} />
            <CiSearch className="search-icon" onClick={() => togglesearch()} />
          </div>
        <LongMenu className="LongMenu" AddMemory={setOpenAddMemory} />
        </div>
        <div className="App-btns">
          <div className="search-container d-flex align-items-center gap-2">
            <input type="text" placeholder="Search Memories, tags..." className="search-input" onChange={searchMemory} value={searchQuery} />
            <CiSearch className="search-icon" />
          </div>
          {/* <button className="btn-app d-flex align-items-center gap-2">
            <CiHeart className="fav-icon" /> Favorites
          </button> */}
          <button
            className="btn-app btn-primary d-flex align-items-center gap-2"
            onClick={() => setOpenAddMemory(true)}
          >
            <CiCamera className="camera-icon" /> Add Memory
          </button>
        </div>
      </header>
      <Routes>
        <Route path="/" element={
          <div className='container1'>
            <div className='template'>
              <h1 className='template-title'>A Journey Through Time</h1>
              <p className='template-desc'>Every photograph tells a story, capture and share your memories with the world.</p>
            </div>
            <div className='d-flex justify-content-start align-items-center gap-3 mb-4 tabs-container'>
              <CiCalendar className='cal'/>
              <button 
                className={`btn-Add btn-app d-flex align-items-center gap-2 tab ${selectedYear === 'All' ? 'bg-primary text-white' : 'btn-outline-primary text-white'}`}
                onClick={() => setSelectedYear('All')}
              >
                All Memories
              </button>
              <button 
                className={`btn-Add btn-app d-flex align-items-center gap-2 tab ${selectedYear === '2025' ? 'bg-primary text-white' : 'btn-outline-primary text-white'}`}
                onClick={() => setSelectedYear('2025')}
              >
                2025
              </button>
              <button 
                className={`btn-Add btn-app d-flex align-items-center gap-2 tab ${selectedYear === '2024' ? 'bg-primary text-white' : 'btn-outline-primary text-white'}`}
                onClick={() => setSelectedYear('2024')}
              >
                2024
              </button>
            </div>
            <Cards refreshTrigger={refreshTrigger} filterYear={selectedYear} searchQuery={searchQuery} />
          </div>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <AddMemory open={openAddMemory} onClose={() => setOpenAddMemory(false)} onMemoryAdded={handleMemoryAdded} />
    </div>
  );
}

export default App;
