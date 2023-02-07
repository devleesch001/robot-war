import React from 'react';
import './App.css';
import NewTournament from './components/NewTournament/newTournament';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />}></Route>
                <Route path="/tournament" element={<NewTournament />} />
            </Route>
        </Routes>
    );
}

export default App;
