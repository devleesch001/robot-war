import React from 'react';
import './App.css';
import CreateTournament from './components/Tournament/CreateTournament';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import { ConfigProvider } from 'antd';
import Com from './components/Com';
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
                    <Route path="/fights/:fightId" element={<Com />} />
                </Route>
            </Routes>
        </ConfigProvider>
    );
};

export default App;
