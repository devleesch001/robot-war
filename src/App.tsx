import React from 'react';
import './App.css';
import CreateTournament from './components/Tournament/CreateTournament';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import { ConfigProvider } from 'antd';
import DisplayFight from './components/Fight/DisplayFight';
import TournamentBoard from './components/Tournament/TournamentBoard';
const App = () => {
    return (
        <ConfigProvider
        // theme={{
        //     token: {
        //         fontSize: 20,
        //     },
        //     components: {
        //         Button: { margin: 50 },
        //     },
        // }}
        >
            <Routes>
                <Route path="/">
                    <Route index element={<Home />}></Route>
                    <Route path="/admin/back-office" element={<Admin />} />
                    <Route path="/fights/:fightId" element={<DisplayFight isAdmin={false} />} />
                    <Route path="/admin/fights/:fightId" element={<DisplayFight isAdmin={true} />} />
                    <Route path="/tournament/:tournamentId" element={<TournamentBoard isAdmin={false} />} />
                    <Route path="/admin/tournament/:tournamentId" element={<TournamentBoard isAdmin={true} />} />
                    <Route path="/displayMatch" element={<DisplayFight isAdmin={false} />} />
                </Route>
            </Routes>
        </ConfigProvider>
    );
};
export default App;
