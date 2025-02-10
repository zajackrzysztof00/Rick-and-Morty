import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharactersPages from "./CharactersPages";
import CharacterPage from "./CharacterPage";

export const CharacterContext = createContext();

function App() {

  const [characterId, setCharacterId] = useState(1);

  return (
    <CharacterContext.Provider value={{ characterId, setCharacterId }}>
      <Router>
        <Routes>
          {/* Route for characters list */}
          <Route path="/" element={<CharactersPages />} />
          
          {/* Route for character details */}
          <Route path="/characterInfo" element={<CharacterPage />} />
        </Routes>
      </Router>
    </CharacterContext.Provider>

  );
}

export default App;
