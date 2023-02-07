import React from 'react';
import './App.css';
import CardCombatBoard from './components/BattleBord/cardCombatBoard';
import GridBattleBoard from './components/BattleBord/gridBattleBoard';
import NewTournament from './components/Modes de jeu /NewTournament/newTournament';
import CreateRobot from './components/CreateRobot/CreateRobot';

function App() {
    return (
        <div className="App">
            <NewTournament />
        </div>
    );
}

export default App;
