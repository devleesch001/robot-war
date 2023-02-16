import React from 'react';
import './App.css';
import CreateTournament from './components/Tournament/CreateTournament';
import Home from './components/Page/Home';

import { Routes, Route } from 'react-router-dom';
import Admin from './components/Page/Admin';
import { ConfigProvider } from 'antd';
import DisplayFight from './components/Fight/DisplayFight';
import TournamentBoard from './components/Tournament/TournamentBoard';
import CreateOrder from './components/Ordeal/CreateOrder';
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
                    <Route path="/tournament" element={<CreateTournament />} />
                    <Route path="/admin/back-office" element={<Admin />} />
                    <Route path="/displayMatch" element={<DisplayFight isAdmin={false} />} />
                    <Route path="/fights/:fightId" element={<DisplayFight isAdmin={false} />} />
                    <Route path="/admin/fights/:fightId" element={<DisplayFight isAdmin={true} />} />
                    <Route path="/tournament/:tournamentId" element={<TournamentBoard isAdmin={false} />} />
                    <Route path="/admin/tournament/:tournamentId" element={<TournamentBoard isAdmin={true} />} />
                    <Route path="/C" element={<CreateOrder />} />
                </Route>
            </Routes>
        </ConfigProvider>
    );
};
export default App;
