import React from 'react';
import './App.css';
import CreateTournament from './components/Tournament/CreateTournament';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';

import { ConfigProvider } from 'antd';
//TEST
import Timerfight from './components/Element/Timer';
import CardStatisticalFight from './components/Fight/DIsplayFight/CardStatisticalFight';
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
                    <Route path="/Timer" element={<Timerfight />} />
                    <Route
                        path="/media"
                        element={
                            <MediaPlayer
                                mediaSrc={
                                    'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'
                                }
                            />
                        }
                    />
                </Route>
            </Routes>
        </ConfigProvider>
    );
};

export default App;
