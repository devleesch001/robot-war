import React from 'react';
import './App.css';
import CreateTournament from './components/GameMode/Tournament/CreateTournament';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';

const App = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />}></Route>
                <Route path="/tournament" element={<CreateTournament />} />
                <Route path="/admin/back-office" element={<Admin />} />
            </Route>
        </Routes>
    );
};

export default App;
