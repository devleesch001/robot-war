import React from 'react';
import './App.css';
import CreateTournament from './components/Tournament/CreateTournament';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import { ConfigProvider } from 'antd';
import Com from './components/Com';
import Timerfight from './components/Element/Timer';
import MediaPlayer from './components/Fight/DIsplayFight/MediaPlayer';
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
                    <Route
                        path="/media"
                        element={
                            <MediaPlayer
                                mediaSrc={
                                    'https://www.youtube.com/watch?v=Oludqq_LDtQ&list=RDOludqq_LDtQ&start_radio=1'
                                }
                            />
                        }
                    />
                    <Route path="/fights/:fightId" element={<Timerfight />} />
                </Route>
            </Routes>
        </ConfigProvider>
    );
};
export default App;
