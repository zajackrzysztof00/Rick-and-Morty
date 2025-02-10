import logo from './logo.svg';
import './App.css';
import React, { 
  createContext, 
  useState, 
  useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharactersPages from "./CharactersPages";
import CharacterPage from "./CharacterPage";

export const PageContext = createContext();

function App() {

  const [characterId, setCharacterId] = useState(() => {
    const savedCharacterId = sessionStorage.getItem('characterId');
    return savedCharacterId ? JSON.parse(savedCharacterId) : 1;
  });

  const [page, setPage] = useState(() => {
    const savedPage = sessionStorage.getItem('activePage');
    return savedPage ? JSON.parse(savedPage) : 1;
  });

  const [status, setStatus] = useState(() => {
    const savedStatus = sessionStorage.getItem('status');
    return savedStatus ? JSON.parse(savedStatus): 'none';
  });

  useEffect(() => {
    sessionStorage.setItem('characterId', JSON.stringify(characterId));
    sessionStorage.setItem('activePage', JSON.stringify(page));
    sessionStorage.setItem('status', JSON.stringify(status));
  }, [characterId, page, status]);

  return (
    <PageContext.Provider value={{ 
      characterId, setCharacterId, 
      page, setPage , 
      status, setStatus}}>
      <Router>
        <Routes>
          {/* Route for characters list */}
          <Route path="/" element={<CharactersPages />} />
          
          {/* Route for character details */}
          <Route path="/characterInfo" element={<CharacterPage />} />
        </Routes>
      </Router>
    </PageContext.Provider>

  );
}

export default App;
